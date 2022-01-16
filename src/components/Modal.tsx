import React from 'react'
import { useEnv } from '../context/EnvContext';

const CModal = (props: any) => {
  const {
    show,
    mode,
    onClick,
    children
  } = props;
  const env = useEnv();
  // const padding = 8;

  const styles = {
    modalContainer: {
      position: 'fixed',
      left: 0,
      bottom: (show === false || show === '')  ? '0' : '-150vh',
      width: (mode === 'full') ? '100vw' : 'auto',
      height: (mode === 'full') ? '100vh' : (mode === 'half') ? '50vh' : 'auto',
      transition: 'bottom .3s ease-out',
      zIndex: 30,
    },
    modalBody: {
      width: (mode === 'full') ? '100vw' : 'auto',
      height: (mode === 'full') ? '100vh' : (mode === 'half') ? '50vh' : 'auto',
      background: env.bgColor,
      // padding: padding,
      overflowY: 'auto',
    }
  } as const 

  return (
    <div style={styles.modalContainer}>
      {(show === true || show !== '') && <div style={styles.modalBody} onClick={onClick}>
        {children}
      </div>} 
    </div>
  )
}

export default CModal
