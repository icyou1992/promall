import React, { useState } from 'react'
import { EmptyPage } from '../util'
import Switch from 'react-switch';
import { theme } from '../../constants/Color';
import { useEnv } from '../../context/EnvContext';


const SettingPage = () => {
  const env = useEnv();
  const padding = 8;

  const styles = {
    container: {
      padding: padding,
    }
  }
  return (
    <EmptyPage navigation>
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
