import React from 'react'
import { useEnv } from '../context/EnvContext';

const Input = (props: any) => {
  const {
    header,
    value,
    multiple,
    onChange,
    placeholder,
    type,
    headerStyle,
    inputContainerStyle,
    inputStyle,
    color,
  } = props;
  const env = useEnv();
  const padding = 8;
  const margin = 8;
  
  const styles = {
    header: {
      fontWeight: 'bold',
      marginBottom: margin/2,
      justifyContent: 'space-between',
    },
    inputContainer: {
      borderBottom: `1px ${env.fontColor} solid`,
      marginBottom: margin,
    },
    input: {
      width: '100%',
      backgroundColor: 'transparent',
      paddingBottom: padding/2,
      paddingTop: padding/2,
      fontSize: '1rem', 
      border: 0, 
      outline: 'none',
      color: env.fontColor,
    },
  }
  
  return (
    <div>
      <div style={{ ...styles.header, ...headerStyle }}>{header}</div>
      <div style={{ ...styles.inputContainer, ...inputContainerStyle }}>
        <input multiple={multiple} type={type} style={{ ...styles.input, ...inputStyle }} value={value} onChange={onChange} placeholder={placeholder}/>
      </div>
    </div>
  )
}

export default Input
