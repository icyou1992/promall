import React from 'react'
import { lavender } from '../constants/Color';

const Text = (props: any) => {
  const {
    value,
    textStyle,
  } = props;

  const styles = {
    text: {
      fontSize: '1rem',
      color: lavender,
    }
  }
  return (
    <div style={{ ...styles.text, ...textStyle }}>{value}</div>
  )
}

export default Text
