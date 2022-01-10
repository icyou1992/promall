import React from 'react'
import { LoginPage } from '.';
import { useFirebase } from '../../context/FirebaseContext'
import { EmptyPage } from '../util'

const AlarmPage = (props: any) => {
  const firebase = useFirebase();
  
  if(!firebase.currentUser) return (<LoginPage />);
  return (
    <EmptyPage>
      Alarm
    </EmptyPage>
  )
}

export default AlarmPage
