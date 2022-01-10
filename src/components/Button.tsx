import React from 'react'
import { theme, lavender } from '../constants/Color';

const Button = (props: any) => {
  const {
    onClick,
    color,
    bgColor,
    buttonStyle,
    children,
  } = props;
  const borderRadius = 8;
  const padding = 8;

  const styles ={
    button: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: bgColor,
      color: color,
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
