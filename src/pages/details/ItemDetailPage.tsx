import React from 'react'
import { Modal } from '../../components';
import { dark, darkgray, lavender } from '../../constants/Color';

const ItemDetailPage = (props: any) => {
  const {
    show,
    mode,
    onClick,
    title,
    titleStyle,
    infoStyle,
    bodyStyle,
    brand,
    brandStyle,
    expirationDate,
    expirationDateStyle,
    expirationDateContainerStyle,
    until,
    untilStyle,
    description,
    descriptionStyle,
    location,
    locationStyle,
    image,
  } = props;
  const padding = 8;

  const styles = {
    // container: {
    //   display: 'flex',
    //   flexDirection: 'column',
    //   overflow: 'hidden',
    //   width: '100%',
    //   backgroundColor: 'transparent',
    //   borderRadius: borderRadius,
    //   borderBottom: '2px solid #ccc',
    //   borderRight: '1px solid #ccc',
    //   border: 0,
    //   boxShadow: '0px 1px 2px #888',
    // },
    title: {
      width: '100%',
      padding: `${padding}px ${padding}px ${padding/2}px ${padding}px`,
      // height: '2rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: lavender,
      backgroundColor: dark,
      borderBottom: '1px solid #222',
      letterSpacing: '0.1rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    info: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: `${padding/2}px ${padding}px ${padding/2}px ${padding}px`,
      backgroundColor: darkgray,
    },
    brand: {
      fontSize: '0.8rem',
      alignSelf: 'flex-start',
      color: lavender
    },
    expirationDateContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    expirationDate: {
      fontSize: '0.8rem',
      alignSelf: 'flex-start',
      color: lavender
    },
    until: {
      fontSize: '0.8rem',
      alignSelf: 'flex-end',
      color: lavender
    },
    description: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      width: '100%',
      border: '0px',
      color: lavender,
    },
    location: {
      fontSize: '0.8rem',
      width: '100%',
      color: lavender
    },
    add: {
      width: '100%',
      border: 0,
      padding: padding,
      backgroundColor: dark,
    }, 
  } as const 

  return (
    <Modal show={show} mode={mode} onClick={onClick}>
      <div style={{ ...styles.title, ...titleStyle }}>{title}</div>
      <div style={{ ...styles.body, ...bodyStyle }}>
        <div style={{ ...styles.expirationDateContainer, ...expirationDateContainerStyle}}>
          <span style={{ ...styles.expirationDate, ...expirationDateStyle }}>{expirationDate}</span>
          <span style={{ ...styles.until, ...untilStyle }}>{until}</span>
        </div>
        {description && <textarea disabled={true} aria-label="MapMarker" style={{ ...styles.description, ...descriptionStyle}} value={description} />}
        {(brand !== 'none' || !brand) && <span style={{ ...styles.brand, ...brandStyle }}>{brand}</span>}
        <div style={{ ...styles.location, ...locationStyle }}>{location}</div>
        <img src={image} alt="can't find" width="100%"/>
      </div>
    </Modal>
  )
}

export default ItemDetailPage
