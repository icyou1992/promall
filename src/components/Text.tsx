import React from 'react'

const Text = (props: any) => {
  const {
    value,
    color,
    textStyle,
  } = props;

  const styles = {
    text: {
      fontSize: '1rem',
      color: color,
    }
  }
  return (
    <div style={{ ...styles.text, ...textStyle }}>{value}</div>
  )
}

export default Text
