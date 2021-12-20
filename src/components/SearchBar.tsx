import React from 'react'
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { bgColor, lavender } from '../constants/Color'

const SearchBar = (props: any) => {
  const {
    value,
    onChange,
    placeholder,
    inputStyle,
    contentContainerStyle,
    backgroundColor,
    iconSize = 16,
    onClick,
    link,
  } = props
  const padding = 4;
  const margin = 8;

  const styles = {
    container: { 
      display: 'flex',
      flex: 1,
      backgroundColor: 'transparent',
    },
    contentContainer: {
      display: 'flex', 
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'space-between', 
      borderBottom: `2px ${lavender} solid`, 
      backgroundColor: bgColor,
      paddingTop: padding,
      paddingBottom: padding,
    },
    input: { 
      width: '100%',
      backgroundColor: backgroundColor ? backgroundColor : bgColor,
      fontSize: '1rem', 
      border: '0px', 
      outline: 'none',
      color: lavender,
    },
    search: { marginLeft: margin, marginRight: margin, },
  } as const

  return (
    <>
      <div style={styles.container}>
        <div style={{ ...styles.contentContainer, ...contentContainerStyle }}>
          <input 
            aria-label="Search"
            style={{ ...styles.input, ...inputStyle }}
            placeholder={placeholder ? placeholder : ''}  
            value={value} 
            // onChange={(e) => { setSearch(e.currentTarget.value); }}  
            onChange={onChange}  
            size={1}
          />
          {link && <Link aria-label="SearchLink" to={{ pathname: "/search", search: `?keyword=${value}` }}>
            <FaSearch role='button' style={styles.search} size={iconSize} color={lavender} />
          </Link>}
          {onClick &&
            <FaSearch role='button' style={styles.search} size={iconSize} color={lavender} onClick={onClick}/>
          }          
        </div>
      </div>
    </>
  )
}


export default SearchBar
