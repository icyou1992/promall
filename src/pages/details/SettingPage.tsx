import React, { useState } from 'react'
import { EmptyPage } from '../util'
import Switch from 'react-switch';
import { dark, lavender, white } from '../../constants/Color';
import { useEnv } from '../../context/EnvContext';


const SettingPage = () => {
  const env = useEnv();

  return (
    <EmptyPage navigation>
      <Switch onChange={() => { 
        env.setMode(!env.mode);  
      }} checked={env.mode} onColor={dark} offColor={lavender} />
      asdfasdf
    </EmptyPage>
  )
}

export default SettingPage
