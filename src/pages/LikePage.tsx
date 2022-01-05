import React from 'react'
import { EmptyPage } from './util'
import { Link, Navigate } from 'react-router-dom';
import { lavender, white } from '../constants/Color';
import { FaBell } from 'react-icons/fa';
import { useFirebase } from '../context/FirebaseContext';

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
    <EmptyPage 
      header={
        <>
          <div style={styles.headerText}>{header}</div>
          <Link style={styles.bell} to={'/alarm'}>
            <FaBell color={white} size={24} />
          </Link>
        </>
      }
      headerStyle={styles.header}
      navigation
    >
      Like
    </EmptyPage>
  )
}

export default LikePage
