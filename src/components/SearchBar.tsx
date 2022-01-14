import React from 'react'
import { useNavigate } from 'react-router';
import { useEnv } from '../context/EnvContext';
import { FaSearch } from 'react-icons/fa';

const SearchBar = (props: any) => {
  const {
    value,
    onChange,
    placeholder,
    inputStyle,
    contentContainerStyle,
    backgroundColor,
    iconSize = 16,
    onClick,
  } = props
  const env = useEnv();
  const navigate = useNavigate();
  const padding = 4;
  const margin = 8;

  const styles = {
    container: { 
      display: 'flex',
      flex: 1,
      backgroundColor: 'transparent',
    },
    contentContainer: {
      display: 'flex', 
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'space-between', 
      borderBottom: `2px ${env.fontColor} solid`, 
      backgroundColor: env.bgColor,
      paddingTop: padding,
      paddingBottom: padding,
    },
    input: { 
      width: '100%',
      backgroundColor: backgroundColor ? backgroundColor : env.bgColor,
      fontSize: '1rem', 
      border: '0px', 
      outline: 'none',
      color: env.fontColor,
    },
    search: { marginLeft: margin, marginRight: margin, },
  } as const

  return (
    <>
      <div style={styles.container}>
        <div style={{ ...styles.contentContainer, ...contentContainerStyle }}>
          <input 
            aria-label="Search"
            style={{ ...styles.input, ...inputStyle }}
            placeholder={placeholder ? placeholder : ''}  
            value={value} 
            onChange={onChange}  
            size={1}
          />
          {<div onClick={onClick}>
            <div aria-label="SearchLink" onClick={() => navigate('/search', { state: { keyword: value } })}>
              <FaSearch role='button' style={styles.search} size={iconSize} color={env.fontColor} />
            </div>
          </div>}       
        </div>
      </div>
    </>
  )
}


export default SearchBar
