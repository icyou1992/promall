import React, { useState, useContext, createContext } from 'react'
import { black, dark, gray, lavender, white } from '../constants/Color';

type mode = 'light' | 'dark';
// type env = {
//   mode: 'light' | 'dark';
// }

const EnvContext = createContext({ mode: 'light', bgColor: lavender, fontColor: black })

export const useEnv = () => {
  return useContext(EnvContext)
}

export const EnvProvider = ({ children }: any) => {
  const [mode, setMode] = useState('light');
  const bgColor = mode === 'light' ? white : (mode === 'dark' ? dark : gray);
  const fontColor = mode === 'light' ? black : (mode === 'dark' ? lavender : gray);
  const value = { mode, bgColor, fontColor };
  
  return (
    <EnvContext.Provider value={value}>
      {children}
    </EnvContext.Provider>
  )
}

