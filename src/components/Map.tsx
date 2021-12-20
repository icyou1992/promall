import React from 'react'
import { Map } from 'react-kakao-maps-sdk'

const CMap = (props: any) => {
  const {
    mapStyle,
    userLocation,
    onCreate,
    children,
    mapLevel = 4,
  } = props;
  
  const styles = {
    map: {
      margin: '4px',
      height: '100%',
    },
    
  } as const

  return (
    <Map id={'map'} style={{ ...styles.map, ...mapStyle }} onCreate={onCreate} center={{ lat: userLocation[0], lng: userLocation[1], }} level={mapLevel}>
      {children}
    </Map>
  )
}

export default CMap
