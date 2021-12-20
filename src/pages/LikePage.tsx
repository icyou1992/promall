import React from 'react'
import { EmptyPage } from './util'
import { Link } from 'react-router-dom';
import { lavender, white } from '../constants/Color';
import { FaBell } from 'react-icons/fa';

const LikePage = () => {
  const margin = 8;
  const padding = 8;

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

  return (
    <EmptyPage 
      header={
        <>
          <div style={styles.headerText}>좋아요</div>
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
