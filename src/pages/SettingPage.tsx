import React, { useState } from 'react'
import { EmptyPage } from './util'
import Switch from 'react-switch';
import { dark, white } from '../constants/Color';
import { useEnv } from '../context/EnvContext';


const SettingPage = () => {
  const env = useEnv();

  return (
    <EmptyPage>
      <Switch onChange={() => { 
        env.setMode(!env.mode);  
      }} checked={env.mode} onColor={white} offColor={dark} />
    </EmptyPage>
  )
}

export default SettingPage
