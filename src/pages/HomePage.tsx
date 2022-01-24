import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useFirebase } from '../context/FirebaseContext'
import { useEnv } from '../context/EnvContext'
import { theme } from '../constants/Color'
import { Accordion, Map, MapMarker, SearchBar } from '../components'
import { categoryList } from '../constants/Category'
import { BasicPage } from './util'
import { getPromotionAPI } from '../util/api'
import { IsLDevice, IsMDevice } from '../util/responsive'
import { IoChevronForwardOutline, IoAddCircleOutline } from 'react-icons/io5'


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
  const navigate = useNavigate();
  const margin = 8;
  const padding = 8;
  const borderRadius = 8;
  const iconSize = 24;
  const headerText = '주변 할인 행사';
  const until = '까지';
  
  const styles = {
    accordionContainer: {
      marginTop: -margin,
      fontFamily: 'one_main_light',
    },
    categoryText: {
      textDecoration: 'none',
    },
    map: {
      width: '100%',
      height: '90vh',
    },
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent',
      marginTop: -margin*3,
      padding: padding + 4,
      borderRadius: borderRadius,
      fontFamily: 'one_main_light',
    },
    header: {
      fontSize: '1rem',
      fontFamily: 'one_main_light',
      fontWeight: 'bold',
      letterSpacing: '0.2rem',
      color: env.fontColor,
      marginLeft: margin,
      marginRight: margin,
    },
    searchContainer: {
      display: 'flex',
      flex: 1,
      marginLeft: margin*2,
      marginRight: margin*2,
    },
    mapText: {
      marginBottom: margin,
      fontWeight: 'bold',
      fontSize: '1rem',
      letterSpacing: '0.2rem',
      marginRight: margin*4,
      color: env.fontColor,
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
    rowContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      color: env.fontColor
    },
    expirationDate: {
      fontSize: '0.8rem',
      alignSelf: 'flex-start',
    },
    more: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: env.bgColor,
      paddingRight: padding/2,
    },
    plus: {
      position: 'fixed',
      right: margin*4,
      bottom: margin*8,
      zIndex: 10,
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
              <div style={styles.more} onClick={() => navigate('/')}>
                <IoChevronForwardOutline size={iconSize} color={theme} />
              </div>
            </div>
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
          <div 
            key={index} 
            style={styles.categoryText}
            aria-label="Category"
            onClick={() => navigate(`/search/?id=${item._id}`)} 
          >
            <div role='button' aria-label="card">
              {item.label}
            </div>
            <hr/>
          </div>
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

  // window.history.pushState(null, '', window.location.href)
  // window.onpopstate = () => {
  //   window.open('', '_self', '')
  //   window.self.close();
  // }
  
  useEffect(() => {
    if(!map) return ;
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
    <BasicPage 
      header={
        IsLDevice() ? 
        false 
        :
        <>
          <div style={styles.header} onClick={() => env.setMode(!env.mode)}>{headerText}</div>
          <div style={styles.searchContainer}>
            <SearchBar 
              value={input}
              onChange={(e: any) => { setInput(e.currentTarget.value); }}
              onClick={() => setSearchByKeywordInMap(input)}
            />
          </div>
        </> 
      }
      logo={IsLDevice() ? true : false}
      onLogoClick={() => env.setMode(!env.mode)}
      search={IsLDevice() ? true : false}
      profile={IsLDevice() ? true : false} 
      alarm
      navigation={IsMDevice() ? true : false}
    >
      {IsLDevice() ? 
        <div style={styles.accordionContainer}>
          <Accordion defaultActiveKey={'1'} cards={cards} />
        </div>
      :
        <div style={styles.container}>
          <div id='map' style={styles.map}>
            <Map onCreate={setMap} userLocation={loc} events={events} mapLevel={mapLevel}>
              {events.map((event: any, index: number) => {
                return setEvent(event, index)                 
              })}
            </Map>
          </div>
          <div style={styles.plus} onClick={() => navigate('/add')}>
            <IoAddCircleOutline color={theme} size={iconSize*2}/>
          </div>
        </div>
      }
    </BasicPage>
  )
}


export default HomePage
