import React from 'react'
import { Link } from 'react-router-dom';
import { bgColor, lavender } from '../../constants/Color';
import { MDevice } from '../../util/responsive';
import { Navigation } from '../../components';
import { IoChevronBackOutline } from 'react-icons/io5'

const EmptyPage = (props: any) => {
  const {
    back,
    backSize = 32,
    backColor = lavender,
    backLink = '/',
    header,
    headerStyle,
    children,
    navigation,
  } = props;
  // const margin = 8;
  const padding = 8;

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
      backgroundColor: bgColor,
      height: 'auto',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: padding,
      // marginBottom: margin,
    },
  }

  return (
    <div style={styles.container}>
      <div style={{ ...styles.header, ...headerStyle }}>
        {back && <Link to={backLink}><IoChevronBackOutline size={backSize} color={backColor}/></Link>}
        {header}
      </div>
      {children}
      {navigation && <MDevice>
        <Navigation />
      </MDevice>}
    </div>
  )
}

export default EmptyPage
