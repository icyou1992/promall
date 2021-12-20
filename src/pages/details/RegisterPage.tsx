import React, { useState } from 'react'
import { bgColor, dark, lavender } from '../../constants/Color';
import { Input, Text, Button } from '../../components';
import { EmptyPage } from '../util';
import { createUser } from '../../util/api';

const RegisterPage = (props: any) => {
  // const {} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [pwPlaceholder, setPwPlaceholder] = useState('비밀번호를 입력해주세요');
  const [pwcPlaceholder, setPwcPlaceholder] = useState('같은 비밀번호를 입력해주세요');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const padding = 8;
  const margin = 8;
  const borderRadius = 8;
  const iconSize = 32;

  const styles = {
    back: {
    },
    title: {
      fontWeight: 'bold',
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
    rowContentContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'between-space',
      alignItems: 'center',
    },
    line: {
      flex: 1,
      height: 2, 
      backgroundColor: bgColor, 
      // margin: -8, 
      marginTop: 4, 
      marginBottom: 12, 
    },
    entry: {
      fontSize: '0.8rem',
      color: bgColor,
      marginLeft: margin,
      // alignSelf: 'flex-end',
    },
    form: {
      marginTop: margin*2,
      alignSelf: 'flex-end'
    }
  } as const 

  const requestCreate = async() => {
    if((password === passwordCheck) && password.length > 8) createUser(email, password, name, phone)
    else {
      setPassword('')
      setPasswordCheck('')
      setPwPlaceholder('비밀번호가 일치하지 않거나 너무 짧습니다')
      setPwcPlaceholder('비밀번호가 일치하지 않거나 너무 짧습니다')
    }
  }

  return (
    <EmptyPage
      back
      backSize={iconSize}
      backLink={'/login'}
      headerStyle={styles.back}
      header={
        <>
          <Text textStyle={styles.title} value={'회원가입하기'}/>
          <div style={{ backgroundColor: 'transparent', width: iconSize, height: iconSize }}/>
        </>
      }
    >
      <div style={styles.container}>
        <Input type={'text'} header={'이메일'} value={email} onChange={(e: any) => { setEmail(e.currentTarget.value) }} placeholder={'이메일을 입력해주세요'}/>
        <Input type={'password'} header={'비밀번호'} value={password} onChange={(e: any) => { setPassword(e.currentTarget.value) }} placeholder={pwPlaceholder}/>
        <Input type={'password'} header={'비밀번호 확인'} value={passwordCheck} onChange={(e: any) => { setPasswordCheck(e.currentTarget.value) }} placeholder={pwcPlaceholder}/>
        <div style={styles.rowContentContainer}>
          <div style={styles.line} />
          <Text textStyle={styles.entry} value={'필수'}/>
        </div>

        <Input type={'text'} header={'이름'} value={name} onChange={(e: any) => { setName(e.currentTarget.value) }} placeholder={'이름을 입력해주세요'}/>
        <Input type={'text'} header={'전화번호'} value={phone} onChange={(e: any) => { setPhone(e.currentTarget.value) }} placeholder={'전화번호를 입력해주세요'}/>
        <div style={styles.rowContentContainer}>
          <div style={styles.line} />
          <Text textStyle={styles.entry} value={'선택'}/>
        </div>

        <div style={styles.form}>
          <Button onClick={() => { requestCreate() }}>회원가입하기</Button>
        </div>
        
      </div>
    </EmptyPage>
  )
}

export default RegisterPage
