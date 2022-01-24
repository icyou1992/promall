import React, { useState, useEffect, useRef, useCallback, MutableRefObject } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useFirebase } from '../../context/FirebaseContext'
import { theme } from '../../constants/Color'
import { Button, Input, Logo, Modal } from '../../components'
import { IconCircle } from '../../assets/icon'
import { BasicPage } from '../util'
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
  const navigate = useNavigate();
  // const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const env = useEnv();
  const [err, setErr] = useState('');
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
  // const oauthStatement = '다른 플랫폼으로 로그인하기';
  const naverRef: any = useRef();
  

  const kakaoLogin = useCallback(() => {
    if(!Kakao.isInitialized()) Kakao.init(process.env.REACT_APP_API_KEY_KAKAO)
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
  }, [Kakao])
  
  const naverClick = useCallback(() => {
    console.log(naverRef.current)
    naverRef.current.children[0].click();
  }, [])
  
  const icons = [
    { name: 'kakaotalk', function: () => { kakaoLogin() } }, 
    // { name: 'naver', function: () => {  } }, 
    { name: 'google', function: () => signInWithOAuthAPI(firebase.auth, 'google', IsLScreen) }, 
    { name: 'facebook', function: () => signInWithOAuthAPI(firebase.auth, 'facebook', IsLScreen) }, 
    // { name: 'apple', function: () => signInWithOAuthAPI(firebase.auth, 'apple') }
  ];

  const styles = {
    header: {
      display: 'flex', 
      flex: 1,
      height: 36,
    },
    shortcutContainer: { 
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'transparent',
    },
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent',
      padding: padding*4,
      borderRadius: borderRadius,
      color: env.fontColor,    
      fontFamily: 'one_main_light',
      marginTop: -margin*2,
    },
    logoContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: padding,
      paddingBottom: padding*4,
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
    register: { 
      borderBottom: `1px ${env.fontColor} solid`,
      fontSize: '0.8rem', 
      alignSelf: 'flex-start', 
      color: env.fontColor, 
      textDecoration: 'none',
      fontFamily: 'one_main_bold',
    },
    button: {
      fontFamily: 'one_main_bold',
    },
    modal: {

    }
  } as const 

  // document.addEventListener('backbutton', e => {
  //   e.stopPropagation()
  //   navigate('/', { replace: true })
  // })

  // window.history.pushState(null, '', window.location.href)
  // window.onpopstate = () => {
  //   navigate('/', { replace: true })
  // }

  useEffect(() => {
    const naverLogin = () => {
      const callbackUrl = '/profile'
  
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
    // naverLogin();
    return naverLogin();
  }, [Kakao, naver])

  if(firebase.currentUser) return <Navigate replace to='/profile'/>
  return (
    <BasicPage 
      header={
        <div style={styles.header} />
      }
      setting
      navigation
    >
      <div id={'container'} style={styles.container}>
        <div style={styles.logoContainer} onClick={() => navigate('/like')}>
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
          <div style={styles.register} onClick={() => navigate('/register')}>{registerStatement}</div>
          <Button buttonStyle={styles.button} color={env.fontColor} bgColor={theme} onClick={() => { 
            signInAPI(firebase.auth, email, password).catch((err) => {
              // setErr(err.toString());
              // console.log(err.toString());
            }); 
          }}>{loginStatement}</Button>
        </div>

        {/* <Text textStyle={{ fontWeight: 'bold' }} value={oauthStatement} color={env.fontColor} /> */}
        <div style={styles.rowContentContainer}>
          <div ref={naverRef} id='naverIdLogin' style={{ display: 'none' }}></div>
          <div onClick={naverClick}>
            <IconCircle size={iconSize} image={'naver'} />
          </div>

          {icons.map((icon, index) => (
            <div key={index} id={icon.name} onClick={icon.function}>
              <IconCircle size={iconSize} image={icon.name} />
            </div>
          ))}
        </div>
        {/* <Modal show={err} mode={'half'} onClick={() => setErr(err)}>
          <div style={styles.modal}>{err}</div>
        </Modal> */}
      </div>
    </BasicPage>
  )
}

export default LoginPage
