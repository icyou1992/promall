import React from 'react'

const Text = (props: any) => {
  const {
    value,
    color,
    style,
  } = props;

  const styles = {
    text: {
      fontSize: '1rem',
      color: color,
    }
  }
  return (
    <div style={{ ...styles.text, ...style }}>{value}</div>
  )
}

export default Text
