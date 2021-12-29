import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import { MapMarker, CustomOverlayMap, useMap } from 'react-kakao-maps-sdk'
import { Modal } from '../components'
import { bgColor, dark, darkgray, lavender } from '../constants/Color';

const CMapMarker = (props: any) => {
  const { 
    event,
    childrenUp,
    onClickUp,
    childrenDown,
    onClickDown,
    modalChildren,
  } = props;
  const {
    wrapStyle,
    position,
  } = event;
  const map = useMap();
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const markerSizeBasic = 24;
  const markerSizeFocused = 28;
  const [markerSize, setMarkerSize] = useState(markerSizeBasic);
  const width = 192;
  const padding = 8;
  const offset = 8;
  const borderRadius = 4;

  const styles = {
    wrap: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      overflow: 'hidden',
      left: 0,
      bottom: offset,
      width: width,
      marginLeft: -width/2,
      backgroundColor: bgColor,
      borderRadius: borderRadius,
      borderBottom: '2px solid #ccc',
      borderRight: '1px solid #ccc',
      border: 0,
      boxShadow: '0px 1px 2px #888',
    },
    title: {
      width: '100%',
      padding: `${padding}px ${padding}px ${padding/2}px ${padding}px`,
      fontSize: '1rem',
      fontWeight: 'bold',
      color: lavender,
      backgroundColor: dark,
      borderBottom: '1px solid #222',
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
      padding: `${padding/2}px ${padding}px ${padding/2}px ${padding}px`,
      backgroundColor: darkgray,
      overflow: 'hidden',
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
      backgroundColor: dark,
      padding: padding,
    }, 
  } as const

  const handleClickOutside = (event: any) => {
    if(map.getNode().contains(event.target) && !ref.current.contains(event.target)) {
      setMarkerSize(markerSizeBasic);
      setVisible(false);
    } 
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.addEventListener('click', handleClickOutside);
    }
  });

  return (
    <div>
      <div ref={ref}>
        <MapMarker
          position={{ lat: position.latitude, lng: position.longitude }}
          image={{ src: require('../assets/icon/Gift.png').default, size: { width: markerSize, height: markerSize }, options: { offset: {x: markerSize/2, y: markerSize/2} }}}
          onClick={marker => {
            map.panTo(marker.getPosition()); 
            setMarkerSize((markerSize === markerSizeBasic) ? markerSizeFocused : markerSizeBasic); 
            setVisible(!visible); 
            // setShowModal(!showModal); 
          }}
        >
          {visible && <CustomOverlayMap 
            position={{ lat: position.latitude, lng: position.longitude }} 
            zIndex={1}
          >
            <div style={{ ...styles.wrap, ...wrapStyle }}>
              <div onClick={() => setVisible(false)}>
                <div onClick={onClickUp}>
                  {childrenUp}
                  </div>
                </div>
              <div onClick={() => { setShowModal(true) }}>
                <div onClick={onClickDown}>
                  {childrenDown}
                </div>
              </div>
            </div>
          </CustomOverlayMap>}
        </MapMarker>
      </div>
      <Modal show={showModal} mode={'full'} onClick={() => setShowModal(false)}>
        {modalChildren}
      </Modal>
    </div>
  )
}

export default CMapMarker
