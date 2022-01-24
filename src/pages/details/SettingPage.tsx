import React, { useState } from 'react'
import { EmptyPage } from '../util'
import Switch from 'react-switch';
import { theme } from '../../constants/Color';
import { useEnv } from '../../context/EnvContext';
import { Text } from '../../components';


const SettingPage = () => {
  const env = useEnv();
  const padding = 8;
  const iconSize = 32;

  const styles = {
    container: {
      padding: padding,
    },
    title: {
      fontWeight: 'bold',
    },
  }
  return (
    <EmptyPage
      back
      header={
        <>
          <Text textStyle={styles.title} value={'설정'}/>
          <div style={{ backgroundColor: 'transparent', width: iconSize, height: iconSize }}/>
        </>
      }
    >
      <div style={styles.container}>
        theme: <Switch 
          onChange={() => env.setMode(!env.mode)} 
          checked={env.mode} 
          onColor={theme} 
          offColor={theme} 
          onHandleColor={env.bgColor}
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={24}
        />

      </div>
      
    </EmptyPage>
  )
}

export default SettingPage
