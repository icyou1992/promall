import React from 'react'
import { FaChevronRight } from 'react-icons/fa';
import { lavender } from '../constants/Color';

const ListItem = (props: any) => {
  const { index, children, onClick } = props;
  const margin = 8;
  const arrowSize = 16;

  const styles = {
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
    },
    contentsContainer: {
      display: 'flex',
      flex: 1,
    },
    numbering: {
      borderRight: '1px',
      borderColor: lavender,
      marginRight: margin,
    },
    title: {
      marginLeft: margin,
      marginRight: margin,
      color: lavender,
    },
    arrow: {
      marginRight: margin,
    }
  }

  return (
    <div style={styles.container} onClick={onClick}>
      <div style={styles.contentsContainer}>
        <div style={styles.numbering}>{index}</div>
        <div style={styles.title}>{children}</div>
      </div>
      <div style={styles.arrow}>
        <FaChevronRight size={arrowSize} color={lavender} />
      </div>
    </div>
  )
}

export default ListItem
