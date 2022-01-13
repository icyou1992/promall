import React, { useState, useContext, createContext, useMemo } from 'react'
import { black, dark, lavender, white } from '../constants/Color';


// type Props = {
//   mode: boolean,
//   setMode: Function,
//   bgColor: string,
//   fontColor: string,
// }
const EnvContext = createContext({ mode: true, setMode: (mode: any) => { return mode }, bgColor: lavender, fontColor: black });

export const useEnv = () => {
  return useContext(EnvContext)
}

// true: light, false: dark
export const EnvProvider = ({ children }: any) => {
  const [mode, setMode]: any = useState(true);
  const bgColor = useMemo(() => { return mode === true ? white : dark }, [mode]);
  const fontColor = useMemo(() => { return mode === true ? black : lavender }, [mode]);

  return (
    <EnvContext.Provider value={{ mode, setMode, bgColor, fontColor }}>
      {children}
    </EnvContext.Provider>
  )
}

