import React from 'react'
import { useEnv } from '../../context/EnvContext';
import { Link } from 'react-router-dom';
import { MDevice } from '../../util/responsive';
import { Navigation } from '../../components';
import { IoChevronBackOutline } from 'react-icons/io5'

const EmptyPage = (props: any) => {
  const {
    back,
    backSize = 32,
    backLink = '/',
    header,
    headerStyle,
    children,
    navigation,
  } = props;
  // const margin = 8;
  const env = useEnv();
  const padding = 8;

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      backgroundColor: env.bgColor,
    },
    header: {
      display: 'flex',
      flex: 1,
      // background: `linear-gradient(to bottom, #222222 0%, ${env.bgColor} 100%)`,
      backgroundColor: env.bgColor,
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
        {back && <Link to={backLink}><IoChevronBackOutline size={backSize} color={env.fontColor}/></Link>}
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
