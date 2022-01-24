import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import { theme } from '../../constants/Color';
import { useEnv } from '../../context/EnvContext';
import { EmptyPage } from '../util';
import AnimatedPage from '../util/AnimatedPage';

const ItemDetailPage = (props: any) => {
  const {
    onClick,
    titleStyle,
    bodyStyle,
    brandStyle,
    expirationDateStyle,
    rowContentContainerStyle,
    descriptionStyle,
    locationStyle,
  } = props;
  const env = useEnv();
  const navigate = useNavigate();
  const { state }: any = useLocation();
  const { event } = state;
  const margin = 8;
  const padding = 8;
  const borderRadius = 8;

  const styles = {
    container: {},
    title: {
      width: '100%',
      padding: padding,
      // height: '2rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: env.fontColor,
      backgroundColor: 'transparent',
      // borderBottom: '1px solid #222',
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
      padding: padding,
      borderRadius: borderRadius,
      color: env.fontColor,
    },
    brand: {
      fontSize: '0.8rem',
      alignSelf: 'flex-start',
    },
    rowContentContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      // marginTop: margin,
    },
    expirationDate: {
      fontSize: '0.8rem',
      alignSelf: 'flex-end'
    },
    description: {
      wordBreak: 'break-word',
      marginTop: margin,
      marginBottom: margin,
    },
    location: {
      fontSize: '0.8rem',
      marginTop: margin,
    },
    imageStyle: {
      marginTop: margin,
      borderRadius: borderRadius,
    }
  } as const 

  return (
    <AnimatedPage>
    <EmptyPage>
      <div style={styles.container} onClick={() => navigate(-1)}>
        <div onClick={onClick}>
        <div style={{ ...styles.title, ...titleStyle }}>{event.title}</div>
        <div style={{ ...styles.body, ...bodyStyle }}>
          {(event.brand !== 'none' || !event.brand) && <div style={{ ...styles.brand, ...brandStyle }}>{event.brand}</div>}
          <div style={{ ...styles.rowContentContainer, ...rowContentContainerStyle}}>
            <div style={{ ...styles.location, ...locationStyle }}>{event.location}</div>
            <div style={{ ...styles.expirationDate, ...expirationDateStyle }}>{event.expirationDate}{' 까지'}</div>
          </div>
          {event.description && <div style={{ ...styles.description, ...descriptionStyle}}>{event.description}</div>}
          {(event.images).map((image: string, index: number) => (
            <img key={index} style={styles.imageStyle} src={image} alt="can't find" width="100%"/>
          ))}
        </div>
        </div>
      </div>
    </EmptyPage>
    </AnimatedPage>
  )
}

export default ItemDetailPage
