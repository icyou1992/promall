import React, { useState } from 'react'
import { bgColor, dark, lavender } from '../../constants/Color'
import Logo from '../../assets/logo/Logo2'
import { Button, Input, Text } from '../../components'
import { IconCircle } from '../../assets/icon'
import { Link } from 'react-router-dom'
import { EmptyPage } from '../util'

const LoginPage = (props: any) => {
  // const {} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const padding = 8;
  const margin = 8;
  const borderRadius = 8;
  const logoSize = 192;
  const iconSize = 48;
  const icons = ['kakaotalk', 'naver', 'google', 'facebook', 'apple'];

  const styles ={
    header: {
      justifyContent: 'space-between',
      padding: `${padding}px ${padding*2}px ${padding}px ${padding*2}px`,
    },
    headerText: {
      color: lavender,
      fontSize: '1.2rem',
      fontWeight: 'bold',
      letterSpacing: '0.2rem',
    },
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: dark,
      padding: padding*4,
      borderRadius: borderRadius,
      color: lavender,    
    },
    logoContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: padding,
      paddingBottom: padding*4,
    },
    contentHeaderContainer: {
      marginTop: margin*2,
      // marginBottom: margin,
    },
    rowContentContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: margin,
      marginBottom: margin,
    },
    icon: {
      margin: margin,
    },
    register: { 
      borderBottom: `1px ${lavender} solid`, 
      fontSize: '0.8rem', 
      alignSelf: 'flex-start', 
      color: lavender, 
      textDecoration: 'none',
    },
    button: {
      borderRadius: borderRadius,
      backgroundColor: bgColor,
      padding: `${padding}px ${padding*2}px ${padding}px ${padding*2}px`,
    },
    profileContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: padding*3,
    },
    profileContentContainer: {
      marginLeft: margin*3,
      fontSize: '1.2rem',
    },
    marketingContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  } as const

  return (
    <EmptyPage navigation>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <Logo size={logoSize} color={bgColor}/>
        </div>

        <Input 
          type={'text'} 
          header={'이메일'}
          value={email}
          onChange={(e: any) => { setEmail(e.currentTarget.value) }}
        />
        <Input 
          type={'password'} 
          header={'비밀번호'}
          value={password}
          onChange={(e: any) => { setPassword(e.currentTarget.value) }}
        />
        
        <div style={{...styles.rowContentContainer, justifyContent: 'space-between', marginBottom: margin*6 }}>
          <Link style={styles.register} to={'/register'}>회원가입하기</Link>
          <Button onClick={() => {}}>로그인</Button>
        </div>

        <Text textStyle={{ fontWeight: 'bold' }} value={'다른 플랫폼으로 로그인하기'}/>
        <div style={styles.rowContentContainer}>
          {icons.map((icon, index) => (
            <div key={index} style={styles.icon}>
              <IconCircle size={iconSize} image={icon} />
            </div>
          ))}
        </div>
      </div>
    </EmptyPage>
  )
}

export default LoginPage
