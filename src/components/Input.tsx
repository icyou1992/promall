import React from 'react'
import { useEnv } from '../context/EnvContext';

const Input = (props: any) => {
  const {
    id,
    header,
    value,
    multiple,
    onChange,
    placeholder,
    type,
    headerStyle,
    inputContainerStyle,
    inputStyle,
    substitute,
    substituteStyle
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
    substitute: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  }
  
  return (
    <div>
      <div style={{ ...styles.header, ...headerStyle }}>{header}</div>
      <div style={{ ...styles.inputContainer, ...inputContainerStyle }}>
        {id === 'file' && <label htmlFor='file' style={{ ...styles.substitute, ...substituteStyle }}><text style={{ color: 'gray' }}>{'이미지를 업로드해주세요'}</text>{substitute}</label>}
        <input id={id} type={type} multiple={multiple} style={{ ...styles.input, ...inputStyle }} value={value} onChange={onChange} placeholder={placeholder}/>
      </div>
    </div>
  )
}

export default Input
