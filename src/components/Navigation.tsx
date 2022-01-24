import React from 'react'
import { useEnv } from '../context/EnvContext';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FaUserCircle, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { darkgray, gray, lavender } from '../constants/Color';

const Navigation = (props: any) => {
  const {
    navigationStyle,
    tabStyle,
    tabTextStyle,
  } = props;
  const env = useEnv();
  const navigate = useNavigate();
  const zIndex = 10;
  const padding = 6;
  const margin = 4;
  const fontSize = 8;
  const bgColor = env.mode ? lavender : darkgray;

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
      backgroundColor: bgColor,
    },
    navigation: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: padding,
      paddingBottom: padding,
      borderTop: `1px solid ${gray}`,
    },
    tab: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: env.fontColor,
    },
    tabText: {
      marginTop: margin,
      fontSize: fontSize,
    }
  } as const 

  return (
    <nav role="navigation" style={{ ...styles.navigationContainer, ...navigationStyle }}>
      <Nav activeKey={1}>
        <div style={{ ...styles.navigation, }}>
          {tabs.map((tab: any, index: number) => (
            <div 
              key={`nav-${index}`} 
              style={{ ...styles.tab, ...tabStyle }} 
              onClick={() => navigate(tab.route, { replace: true })}
            >
              <tab.icon size={20} color={env.fontColor} />
              <div style={{ ...styles.tabText, ...tabTextStyle }}>{tab.label}</div>
            </div>
          ))}
        </div>
      </Nav>
    </nav>
  )
}

export default Navigation
