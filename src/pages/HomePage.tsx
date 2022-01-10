import React, { useState, useEffect } from 'react'
import { useFirebase } from '../context/FirebaseContext'
import { useEnv } from '../context/EnvContext'
import { black, dark, darkgray, gray, hotpink, lavender, theme, white } from '../constants/Color'
import { Accordion, Map, MapMarker, SearchBar } from '../components'
import { categoryList } from '../constants/Category'
import { Link } from 'react-router-dom'
import { BasicPage } from './util'
import { getPromotionAPI } from '../util/api'
import { IsLDevice } from '../util/responsive'
import { FaHeart } from 'react-icons/fa'
import { IoChevronForwardOutline } from 'react-icons/io5'


const HomePage = (props: any) => {
  const firebase = useFirebase()
  const env = useEnv()
  const [map, setMap] = useState();
  const [loc, setLoc] = useState([37.566815, 126.978674]);
  const [events, setEvents] = useState([]);
  // const correction = [- 0.0047, 0.00035];
  //input에 검색어 저장 후 keywordMap으로 검색 -> useEffect 실행
  const [input, setInput] = useState(''); 
  const [searchByKeywordInMap, setSearchByKeywordInMap] = useState('');
  const [mapLevel, setMapLevel] = useState(4);
  const margin = 8;
  const padding = 8;
  const borderRadius = 8;
  const iconSize = 24;
  const mainText = '주변 할인 행사';
  const until = '까지';
  
  const styles = {
    accordionContainer: {
      marginTop: -margin,
    },
    categoryText: {
      textDecoration: 'none',
    },
    map: {
      width: '100%',
      height: '80vh',
    },
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme,
      marginTop: -margin*3,
      padding: padding + 4,
      borderRadius: borderRadius,
      fontFamily: 'one_main_light',
    },
    mapTitle: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: -margin/2,
      fontWeight: 'bold',
    },
    mapText: {
      marginBottom: margin,
      fontWeight: 'bold',
      fontSize: '1rem',
      letterSpacing: '0.2rem',
      marginRight: margin*4,
    },
    mapSearch: {
      display: 'flex', 
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center', 
      backgroundColor: 'transparent',
      paddingBottom: padding/2,
    },
    inputMap: {
      display: 'flex', 
      flex: 1,
      backgroundColor: 'transparent',
      fontSize: '0.8rem', 
      border: '0px', 
      outline: 'none',
    },
    titleContainer: {
      display: 'flex',
      width: '100%',
      backgroundColor: theme,
      padding: padding,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    briefContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: env.bgColor,
      padding: padding,
      justifyContent: 'space-between',
    },
    briefTitle: {
      fontSize: '0.8rem',
      fontWeight: 'bold',
      letterSpacing: '0.1rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingBottom: padding/2,
    },
    briefContent: {

    },
    briefDate: { fontSize: '0.7rem' },
    title: {
      width: '100%',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      letterSpacing: '0.1rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    body: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: `${padding/2}px ${padding}px ${padding/2}px ${padding}px`,
    },
    brand: {
      fontSize: '0.8rem',
      alignSelf: 'flex-start',
    },
    rowContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
    },
    expirationDate: {
      fontSize: '0.8rem',
      alignSelf: 'flex-start',
    },
    until: {
      fontSize: '0.8rem',
      alignSelf: 'flex-end',
    },
    description: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      width: '100%',
      border: 0,
    },
    location: {
      fontSize: '0.8rem',
      width: '100%',
    },
    add: {
      width: '100%',
      borderTop: `1px solid ${white}`,
      padding: padding,
      backgroundColor: env.bgColor,
    }, 
    likeContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: '0.8rem',
      color: hotpink,
    },
    more: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: env.bgColor,
      paddingRight: padding/2,
    }
  } as const

  const setEvent = (event: any, index: number) => {
    return (
      <MapMarker
        key={`${event.position.latitude}.${event.position.longitude}.${index}`}
        event={event}
        children={
          <>
            <div style={styles.rowContainer}>
              <div style={styles.briefContainer}>
                <div style={styles.briefTitle}>{event.title}</div>
                <div style={styles.briefContent}>
                  <div style={styles.briefDate}>{event.expirationDate} {until}</div>
                </div>
              </div>
              <div style={styles.more}>
                <IoChevronForwardOutline size={iconSize} color={theme} />
              </div>
            </div>
          </>
        }
        modalChildren={
          <>
            <div style={styles.titleContainer}>
              <div style={styles.title}>{event.title}</div>
              <FaHeart size={iconSize} color={hotpink}/>
            </div>
            <div style={styles.body}>
              <div style={styles.rowContainer}>
                <span style={styles.expirationDate}>{event.expirationDate}</span>
                <span style={styles.until}>{until}</span>
              </div>
              {event.description && <textarea disabled={true} aria-label="MapMarker" style={styles.description} value={event.description} />}
              {(event.brand !== 'none' || !event.brand) && <span style={styles.brand}>{event.brand}</span>}
              <div style={styles.location}>{event.location}</div>
            </div>
            <br/>
            <img src={event.image} alt="can't find" width="100%"/>
          </>
        }
      />
    )
  }

  const cards = [
    [
      <div style={styles.mapText}>필요한 물품의 할인 행사를 찾아보세요!</div>, 
      <>
        {categoryList.map((item: any, index: number) => (
          <Link 
            key={index} 
            style={styles.categoryText}
            aria-label="Category"
            to={`/search/?id=${item._id}`} 
          >
            <div role='button' aria-label="card">
              {item.label}
            </div>
            <hr/>
          </Link>
        ))}
      </>
    ],
    [
      <div style={styles.mapText}>근처의 할인 행사를 찾아보세요!</div>, 
      <div id='map' style={styles.map}>
        <Map onCreate={setMap} userLocation={loc} events={events} mapLevel={mapLevel}>
          {events.map((event: any, index: number) => {
            return setEvent(event, index)                 
          })}
        </Map>
      </div>
    ]
  ]

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      getPromotionAPI(firebase.db).then(res => {
        setEvents(res);
      })
      let coords = pos.coords;
      setLoc([coords.latitude, coords.longitude])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   window.addEventListener('popstate', (event) => {
  //     props.history.replaceState('/')
  //   });
  // })
  
  useEffect(() => {
    if(!map) return
    const ps = new kakao.maps.services.Places();

    if(searchByKeywordInMap !== '') {
      ps.keywordSearch(searchByKeywordInMap, (data, status, _pagination) => {
        if(status === kakao.maps.services.Status.OK) {
          setLoc([Number(data[0].y), Number(data[0].x)])
          setMapLevel(5)
        }
      })
    }
  }, [map, searchByKeywordInMap])

  return (
    <BasicPage logo navigation>
      {IsLDevice() ? 
        <div style={styles.accordionContainer}>
          <Accordion defaultActiveKey={'1'} cards={cards} />
        </div>
      :
        <div style={styles.container}>
          <div style={styles.mapTitle}>
            <div style={styles.mapText}>{mainText}</div>
            <SearchBar 
              contentContainerStyle={styles.mapSearch}
              inputStyle={styles.inputMap}
              backgroundColor={'transparent'} 
              height={'auto'} 
              value={input}
              onChange={(e: any) => { setInput(e.currentTarget.value); }}
              onClick={() => setSearchByKeywordInMap(input)}
            />
          </div>
          <div id='map' style={styles.map}>
            <Map onCreate={setMap} userLocation={loc} events={events} mapLevel={mapLevel}>
              {events.map((event: any, index: number) => {
                return setEvent(event, index)                 
              })}
            </Map>
          </div>
        </div>
      }
    </BasicPage>
  )
}


export default HomePage
