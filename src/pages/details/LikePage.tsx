import React from 'react'
import { BasicPage } from '../util'
import { Navigate } from 'react-router-dom';
import { lavender } from '../../constants/Color';
import { useFirebase } from '../../context/FirebaseContext';

const LikePage = () => {
  const firebase = useFirebase();
  const margin = 8;
  const padding = 8;
  const header = '좋아요';

  const styles = {
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
    bell: {
      marginLeft: margin*2,
    },
  } as const 

  if(!firebase.currentUser) return <Navigate to='/login'/>;;
  return (
    <BasicPage 
      header={header}
      alarm
      headerStyle={styles.header}
      navigation
    >
      Like
    </BasicPage>
  )
}

export default LikePage
