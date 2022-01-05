import React, { useState, useEffect, } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'
import { EmptyPage } from './util'
import { dark, white, lavender, } from '../constants/Color'
import { SearchBar, ListItem } from '../components'
import { categoryList } from '../constants/Category'
import { IsSDevice } from '../util/responsive'
import { getPromotionAPI } from '../util/api';
import { useFirebase } from '../context/FirebaseContext'

const SearchPage = (props: any) => {
  const firebase = useFirebase();
  const useLoc = useLocation();
  const category = new URLSearchParams(useLoc.search).get('category');
  const keyword = new URLSearchParams(useLoc.search).get('keyword');
  const [searchByKeyword, setSearchByKeyword] = useState('');
  const [sliced, setSliced] = useState<any>();
  const [events, setEvents] = useState([]);
  const unit = IsSDevice() ? 7 : 3;
  const borderRadius = 8;
  const margin = 8;
  const padding = 8;
  const iconSize = 24;
  const itemSize = 64;
  const labelMargin = 4;
  const paddingTop = 4;
  const mainText = '카테고리';
  
  const styles = {
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: dark,
      padding: padding,
      borderRadius: borderRadius,
      color: lavender,    
      fontFamily: 'one_main_light',
    },
    searchContainer: {
      display: 'flex',
      flex: 1,
      marginLeft: margin*2,
    },
    bell: {
      marginLeft: margin*4,
      marginRight: margin
    },
    categoryText: {
      fontSize: '1rem',
      fontWeight: 'bold',
      letterSpacing: '0.2rem',
      color: lavender,
    },
    category: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    categoryRow: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    item: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      width: itemSize,
      height: itemSize,
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none',
    }, 
    label: {
      marginTop: labelMargin,
      color: lavender,
      fontSize: '0.5rem',
      textAlign: 'center',
      wordBreak: 'keep-all',
    },
    listContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: paddingTop, 
    },
  } as const

  const sliceArraybyNumber = (arr: any, n: number) => {
    const len = arr.length;
    const slicedArr = [];
    for(var i = 0; i < len; i += n)
      slicedArr.push(arr.slice(i, i + n))
    
    return slicedArr;
  }

  useEffect(() => {
    setSliced(sliceArraybyNumber(categoryList, unit))
  }, [unit])

  return (
    <EmptyPage
      header={
        <>
          <div style={styles.searchContainer}>
            <SearchBar value={searchByKeyword} onChange={(e: any) => setSearchByKeyword(e.currentTarget.value)} link/>
          </div>
          <Link style={styles.bell} to={'/alarm'}>
            <FaBell color={white} size={24} />
          </Link>
        </>
      }
      navigation
    >
      <div style={styles.container}>
        {(!category && !keyword) ?
        <>
          <div style={styles.categoryText}>{mainText}</div>
          <div style={styles.category}>
            {sliced && sliced.map((categorySet: any, i1: number) => (
              <div key={`category_${i1}`} style={styles.categoryRow}>
                {categorySet.map((item: any, i2: number) => (
                  <Link
                    key={item._id + i2} 
                    to={{ pathname: '/search', search: `?category=${item._id}` }}
                    style={styles.item}
                    onClick={() => { getPromotionAPI(firebase.db, { 'category': item._id }).then(res => { setEvents(res); console.log(res) })}}
                  >
                    <item.icon size={iconSize} color={lavender} />
                    <div style={styles.label}>{item.label}</div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
        :
        <>
          <div style={styles.listContainer}>
            {keyword ?
              <>
                <ListItem>{keyword}</ListItem>
                <hr/>
                <ListItem>{keyword}</ListItem>
                <hr/>
                <ListItem>{keyword}</ListItem>
                <hr/>
                <ListItem>{keyword}</ListItem>
                <hr/>
              </>
            :
            (category && 
              <>
                {events.map((event: any, index: number) => (
                  <div key={index}>
                    <ListItem index={index + 1} onClick={() => console.log(category)}>{event.title + " " + category}</ListItem>
                    <hr/>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
        }
      </div>
    </EmptyPage>
  )
}

SearchPage.propTypes = {
  sliced: PropTypes.any,
}

export default SearchPage
