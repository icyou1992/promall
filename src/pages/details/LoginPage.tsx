import React, { useState, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../../context/FirebaseContext'
import { dark, gray, theme, white } from '../../constants/Color'
import { Button, Input, Text, Logo } from '../../components'
import { IconCircle } from '../../assets/icon'
import { Link } from 'react-router-dom'
import { EmptyPage } from '../util'
import { signInAPI, signInWithOAuthAPI } from '../../util/api'
import { IsLDevice } from '../../util/responsive'
import { useEnv } from '../../context/EnvContext'

declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}

const LoginPage = (props: any) => {
  const { Kakao, naver } = window;
  // const { firebase.auth, user } = props;
  const firebase = useFirebase();
  const env = useEnv();
  const [IsLScreen, setIsLScreen] = useState(IsLDevice());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const padding = 8;
  const margin = 8;
  const borderRadius = 8;
  const logoSize = 192;
  const iconSize = 48;
  const loginStatement = '로그인';
  const registerStatement = '회원가입하기';
  const oauthStatement = '다른 플랫폼으로 로그인하기';
  const naverRef: any = useRef();
  

  const kakaoLogin = () => {
    try {
      // Kakao.Auth.authorize({ redirectUri: 'http://localhost:3000/' })
      Kakao.Auth.loginForm({
        success: (authObj: any) => {
          Kakao.API.request({
            url: '/v2/user/me',
            success: (res: any) => {
              console.log(res);
  
              return res.user
            },
            fail: (err: any) => { throw err }
          }).then((res: any) => res.json())
        },
        fail: (err: any) => {
          console.log(err)
          return err
        }
      })
    } catch(err) {
      console.log(err)
    }
  }
  
  const naverClick = () => {
    console.log(naverRef.current)
    naverRef.current.children[0].click();
  }
  
  const icons = [
    { name: 'kakaotalk', function: () => { kakaoLogin() } }, 
    // { name: 'naver', function: () => {  } }, 
    { name: 'google', function: () => signInWithOAuthAPI(firebase.auth, 'google', IsLScreen) }, 
    { name: 'facebook', function: () => signInWithOAuthAPI(firebase.auth, 'facebook', IsLScreen) }, 
    // { name: 'apple', function: () => signInWithOAuthAPI(firebase.auth, 'apple') }
  ];

  const styles = {
    header: {
      justifyContent: 'space-between',
      padding: `${padding}px ${padding*2}px ${padding}px ${padding*2}px`,
    },
    headerText: {
      color: env.fontColor,
      fontSize: '1.2rem',
      fontWeight: 'bold',
      letterSpacing: '0.2rem',
    },
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme,
      padding: padding*4,
      borderRadius: borderRadius,
      color: env.fontColor,    
      fontFamily: 'one_main_light',
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
      borderBottom: `1px ${env.fontColor} solid`,
      fontSize: '0.8rem', 
      alignSelf: 'flex-start', 
      color: env.fontColor, 
      textDecoration: 'none',
    },
    button: {
      borderRadius: borderRadius,
      backgroundColor: env.fontColor,
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

  useEffect(() => {
    if(!Kakao.isInitialized()) Kakao.init(process.env.REACT_APP_API_KEY_KAKAO)
    
    const naverLogin = () => {
      const callbackUrl = 'http://localhost:3000/profile'
  
      const login = new naver.LoginWithNaverId({
        clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
        callbackUrl: callbackUrl,
        isPopup: true,
        callbackHandle: true,
        loginButton: { type: 1, height: iconSize },
      })
      login.init();
      login.logout();
    } 
    naverLogin();
    // return naverLogin();
  }, [Kakao, naver])

  if(firebase.currentUser) return <Navigate to='/profile'/>
  return (
    <EmptyPage navigation>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <Logo size={logoSize} color={env.fontColor}/>
        </div>

        <Input 
          type={'email'} 
          header={'이메일'}
          value={email}
          color={env.fontColor}
          onChange={(e: any) => { setEmail(e.currentTarget.value) }}
        />
        <br/>
        <Input 
          type={'password'} 
          header={'비밀번호'}
          value={password}
          color={env.fontColor}
          onChange={(e: any) => { setPassword(e.currentTarget.value) }}
        />
        
        <br/>
        <div style={{...styles.rowContentContainer, justifyContent: 'space-between', marginBottom: margin*6 }}>
          <Link style={styles.register} to={'/register'}>{registerStatement}</Link>
          <Button color={env.fontColor} bgColor={env.bgColor} onClick={() => { 
            signInAPI(firebase.auth, email, password)
          }}>{loginStatement}</Button>
        </div>

        <Text textStyle={{ fontWeight: 'bold' }} value={oauthStatement} color={env.fontColor} />
        <div style={styles.rowContentContainer}>
          <div ref={naverRef} id='naverIdLogin' style={{ display: 'none' }}></div>
          <div onClick={naverClick}>
            <IconCircle size={iconSize} image={'naver'} />
          </div>

          {icons.map((icon, index) => (
            <div key={index} id={icon.name} style={styles.icon} onClick={icon.function}>
              <IconCircle size={iconSize} image={icon.name} />
            </div>
          ))}
        </div>
      </div>
    </EmptyPage>
  )
}

export default LoginPage
