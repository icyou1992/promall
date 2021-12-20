import React from 'react'
import { bgColor, lavender } from '../constants/Color';

const Button = (props: any) => {
  const {
    onClick,
    buttonStyle,
    children,
    whiteStyle,
  } = props;
  const borderRadius = 8;
  const padding = 8;

  const styles ={
    button: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: whiteStyle ? lavender : bgColor,
      color: whiteStyle ? bgColor : lavender,
      padding: `${padding}px ${padding*2}px ${padding}px ${padding*2}px`,
      width: 'fit-content',
      border: 0,
      borderRadius: borderRadius,
      boxShadow: '0px 1px 2px #888',
    }
  }

  return (
    <div style={{ ...styles.button, ...buttonStyle }} onClick={onClick}>
      {children}
    </div>
  )
}

export default Button
