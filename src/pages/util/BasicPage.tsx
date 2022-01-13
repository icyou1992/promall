import React from 'react'
import PropTypes from 'prop-types'
import { useEnv } from '../../context/EnvContext'
import { Navigation, Logo } from '../../components'
import { Link } from 'react-router-dom'
// import { FiBell, FiUser, FiSearch } from 'react-icons/fi'
import { FaBell, FaSearch, FaUser } from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5'
import { theme } from '../../constants/Color'

const BasicPage = (props: any) => {
  const {
    logo,
    header,
    headerStyle,
    search,
    alarm,
    profile,
    setting,
    children,
    navigation,
    iconStyle
  } = props;
  const env = useEnv();
  const margin = 8;
  const padding = 8;
  const logoSize = 128;
  const iconSize = 24;

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      backgroundColor: env.bgColor,
    },
    header: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'transparent',
      height: 'auto',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: padding,
    },
    logoContainer: {
      backgroundColor: 'transparent',
    },
    shortcutContainer: { 
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'transparent',
    },
    iconStyle: {
      marginRight: margin,
      marginLeft: margin,
    }
  } as const

  return (
    <>
      <div style={styles.container}>
        <div style={{ ...styles.header, ...headerStyle }}>
          {logo && <Link to={'/'} aria-label="Logo">
            <div role='button' aria-label="Logo" style={styles.logoContainer}>
              <Logo size={logoSize} color={env.fontColor}/>
            </div>
          </Link>}
          {header}   
          <div style={styles.shortcutContainer}>
            {search && <Link to={'/search'} aria-label="Search">
              <FaSearch style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={theme} />
            </Link>}
            {alarm && <Link to={'/alarm'} aria-label="Alarm">
              <FaBell style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={theme} />
            </Link>}
            {profile && <Link to={'/profile'} aria-label="Profile">
              <FaUser style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={theme} />
            </Link>}
            {setting && <Link to={'/setting'} aria-label="Setting">
              <IoSettingsSharp style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={theme} />
            </Link>}
          </div>               
        </div>  
        <br/>
        {children}
      </div>
      {navigation && <Navigation />}
    </>
  )
}

BasicPage.propTypes = {
  logo: PropTypes.bool,
  header: PropTypes.any,
  search: PropTypes.bool,
  alarm: PropTypes.bool,
  profile: PropTypes.bool,
  setting: PropTypes.bool,
  children: PropTypes.any,
  navigation: PropTypes.bool,
}

export default BasicPage
