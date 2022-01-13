import React from 'react'

const Input = (props: any) => {
  const {
    header,
    value,
    onChange,
    placeholder,
    type,
    headerStyle,
    inputContainerStyle,
    inputStyle,
    color,
  } = props;
  const padding = 8;
  const margin = 8;
  
  const styles = {
    header: {
      fontWeight: 'bold',
      marginBottom: margin/2,
      justifyContent: 'space-between',
    },
    inputContainer: {
      borderBottom: `1px ${color} solid`,
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
      color: color,
    },
  }
  
  return (
    <div>
      <div style={{ ...styles.header, ...headerStyle }}>{header}</div>
      <div style={{ ...styles.inputContainer, ...inputContainerStyle }}>
        <input type={type} style={{ ...styles.input, ...inputStyle }} value={value} onChange={onChange} placeholder={placeholder}/>
      </div>
    </div>
  )
}

export default Input
