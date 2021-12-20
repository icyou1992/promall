import React from 'react'
import { Nav } from 'react-bootstrap';
import { FaUserCircle, FaMapMarkerAlt, FaHeart, FaSearch } from 'react-icons/fa';
import { darkgray, white } from '../constants/Color';
const Navigation = (props: any) => {
  const {
    navigationStyle,
    tabStyle,
    tabTextStyle,
  } = props;
  const zIndex = 10;
  const margin = 4;
  const fontSize = 8;


  const tabs = [
    {
      route: "/",
      icon: FaMapMarkerAlt,
      label: "내 주변"
    }, {
      route: "/search",
      icon: FaSearch,
      label: "찾기"
    }, {
      route: "/like",
      icon: FaHeart,
      label: "좋아요"
    }, {
      route: "/profile",
      icon: FaUserCircle,
      label: "내 정보"
    }
  ]

  const styles = {
    navigationContainer: {
      position: 'fixed', 
      bottom: 0,
      // top: 0,
      zIndex: zIndex,
      width: '100%',
      height: 'auto',
      backgroundColor: darkgray,
    },
    navigation: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    tab: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: white,
    },
    tabText: {
      marginTop: margin,
      fontSize: fontSize,
    }
  } as const 

  return (
    <nav role="navigation" style={{ ...styles.navigationContainer, ...navigationStyle }}>
      <Nav activeKey={"/home"}>
        <div style={{ ...styles.navigation, }}>
          {
            tabs.map((tab: any, index: number) => (
              <Nav.Item key={`tab-${index}`}>
                <Nav.Link href={tab.route} >
                  <div style={{ ...styles.tab, ...tabStyle }}>
                    <tab.icon size={20} color={white} />
                    <div style={{ ...styles.tabText, ...tabTextStyle }}>{tab.label}</div>
                  </div>
                </Nav.Link>
              </Nav.Item>
            ))
          }
        </div>
      </Nav>
    </nav>
  )
}

export default Navigation
