import React from 'react'
import PropTypes from 'prop-types'
import { useEnv } from '../../context/EnvContext'
import { Navigation, Logo } from '../../components'
import { useNavigate } from 'react-router-dom'
// import { FiBell, FiUser, FiSearch } from 'react-icons/fi'
import { FaBell, FaSearch, FaUser } from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5'
import { theme } from '../../constants/Color'

const BasicPage = (props: any) => {
  const {
    logo,
    onLogoClick,
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
  const navigate = useNavigate();
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
          {logo && <div role='button' aria-label="Logo" style={styles.logoContainer} onClick={onLogoClick}>
            <Logo size={logoSize} color={env.fontColor} />
          </div>}
          {header}   
          <div style={styles.shortcutContainer}>
            {search && <div aria-label="Search" onClick={() => navigate('/search')}>
              <FaSearch style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={theme} />
            </div>}
            {alarm && <div aria-label="Alarm" onClick={() => navigate('/alarm')}>
              <FaBell style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={theme} />
            </div>}
            {profile && <div aria-label="Profile" onClick={() => navigate('/profile')}>
              <FaUser style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={theme} />
            </div>}
            {setting && <div aria-label="Setting" onClick={() => navigate('/setting')}>
              <IoSettingsSharp style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={theme} />
            </div>}
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
  onLogoClick: PropTypes.func,
  header: PropTypes.any,
  headerStyle: PropTypes.object,
  search: PropTypes.bool,
  alarm: PropTypes.bool,
  profile: PropTypes.bool,
  setting: PropTypes.bool,
  children: PropTypes.any,
  navigation: PropTypes.bool,
}

export default BasicPage
