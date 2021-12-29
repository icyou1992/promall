import React from 'react'
import PropTypes from 'prop-types'
import { bgColor, lavender } from '../../constants/Color'
import { Navigation, Logo } from '../../components'
import { Link } from 'react-router-dom'
import { FaBell, FaSearch, FaUser } from 'react-icons/fa'
import { MDevice, LDevice } from '../../util/responsive'

const BasicPage = (props: any) => {
  const {
    logo,
    header,
    headerStyle,
    children,
    navigation,
    iconStyle
  } = props;
  const margin = 8;
  const padding = 8;
  const logoSize = 128;
  const iconSize = 24;

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      backgroundColor: bgColor,
    },
    header: {
      display: 'flex',
      flex: 1,
      // background: `linear-gradient(to bottom, #222222 0%, ${bgColor} 100%)`,
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
              <Logo size={logoSize} color={lavender}/>
            </div>
          </Link>}
          {header}   
          <div style={styles.shortcutContainer}>
            <LDevice>
              <Link to={'/search'} aria-label="Search">
                <FaSearch style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={lavender} />
              </Link>
            </LDevice>
            <Link to={'/alarm'} aria-label="Alarm">
              <FaBell style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={lavender} />
            </Link>
            <LDevice>
              <Link to={'/profile'} aria-label="Profile">
                <FaUser style={{ ...styles.iconStyle, ...iconStyle }} size={iconSize} color={lavender} />
              </Link>
            </LDevice>
          </div>               
        </div>  
        <br/>
        {children}
      </div>
      {navigation && <MDevice>
        <Navigation />
      </MDevice>}
    </>
  )
}

BasicPage.propTypes = {
  logo: PropTypes.bool,
  children: PropTypes.any,
  navigation: PropTypes.bool,
}

export default BasicPage
