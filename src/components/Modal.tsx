import React from 'react'
import { bgColor } from '../constants/Color';

const CModal = (props: any) => {
  const {
    show,
    mode,
    onClick,
    children
  } = props;
  // const padding = 8;

  const styles = {
    modalContainer: {
      position: 'fixed',
      left: 0,
      bottom: show ? '0' : '-150vh',
      width: (mode === 'full') ? '100vw' : 'auto',
      height: (mode === 'full') ? '100vh' : (mode === 'half') ? '50vh' : 'auto',
      backgroundColor: 'transparent',
      boxShadow: `5 5 5 5 ${bgColor}`,
      transition: 'bottom .3s ease-out',
      zIndex: 30,
    },
    modalBody: {
      width: (mode === 'full') ? '100vw' : 'auto',
      height: (mode === 'full') ? '100vh' : (mode === 'half') ? '50vh' : 'auto',
      background: bgColor,
      // padding: padding,
      overflowY: 'auto',
    }
  } as const 

  return (
    <div style={styles.modalContainer}>
      {show && <div style={styles.modalBody} onClick={onClick}>
        {children}
      </div>} 
    </div>
  )
}

export default CModal
