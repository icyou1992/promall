import React from 'react'
import PropTypes from 'prop-types'
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
      // width: '100vw',
      minHeight: '100vh',
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
    },
  }

  return (
    <div style={styles.container}>
      {(back || header) && <div style={{ ...styles.header, ...headerStyle }}>
        {back && <Link to={backLink}><IoChevronBackOutline size={backSize} color={env.fontColor}/></Link>}
        {header}
      </div>}
      {children}
      {navigation && <MDevice>
        <Navigation />
      </MDevice>}
    </div>
  )
}

EmptyPage.propTypes = {
  back: PropTypes.bool,
  backSize: PropTypes.number,
  backLink: PropTypes.string,
  header: PropTypes.any,
  headerStyle: PropTypes.object,
  children: PropTypes.any,
  navigation: PropTypes.bool,
}


export default EmptyPage
