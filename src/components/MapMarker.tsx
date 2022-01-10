import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import { useEnv } from '../context/EnvContext'
import { MapMarker, CustomOverlayMap, useMap } from 'react-kakao-maps-sdk'
import { Modal } from '../components'

const CMapMarker = (props: any) => {
  const { 
    event,
    children,
    onClick,
    modalChildren,
  } = props;
  const {
    wrapStyle,
    position,
  } = event;
  const map = useMap();
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const env = useEnv();
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const markerSizeBasic = 20;
  const markerSizeFocused = 24;
  const [markerSize, setMarkerSize] = useState(markerSizeBasic);
  const width = 192;
  const offset = 8;
  const borderRadius = 4;
  const markerOpacity = 0.8;

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
      backgroundColor: env.bgColor,
      borderRadius: borderRadius,
      borderBottom: '2px solid #ccc',
      borderRight: '1px solid #ccc',
      border: 0,
      boxShadow: '0px 1px 2px #888',
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

  useEffect(() => {
    // ref.current.removeChild(ref.current.children[0])
    return () => {
      document.querySelector("#map > div:nth-child(1) > div > div:nth-child(6)")?.setAttribute('style', 'display:none')
      document.querySelector("#map > div:nth-child(1) > div > div:nth-child(6) > div:nth-child(3) > div:nth-child(1)")?.setAttribute('style', 'display:none')
      document.querySelector("#map > div:nth-child(1) > div > div:nth-child(6) > div:nth-child(4)")?.remove()
      document.querySelector("#map > div:nth-child(1) > div > div:nth-child(6) > div:nth-child(3) > div:nth-child(1)")?.remove()
      // 이게 실행된 다음에 리렌더링을 시켜야 하는 거 같은데?
      console.log(document.querySelector("#map > div:nth-child(1) > div > div:nth-child(6) > div:nth-child(4)")?.attributes)
    }
  }, [])

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
          opacity={markerOpacity}
        >
          {visible && <CustomOverlayMap 
            // style={{ background: dark }}
            position={{ lat: position.latitude, lng: position.longitude }} 
            zIndex={1}
          >
            <div className="customOverlay" style={{ ...styles.wrap, ...wrapStyle }}>
              <div onClick={() => { setShowModal(true); }}>
                <div onClick={onClick}>
                  {children}
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
