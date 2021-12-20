import React from 'react'

const ArrowUp = (props: any) => {
  const {
    width,
    color,
  } = props;

  return (
    <svg width={width || "24"} height={width || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.59 16.42L12 10L5.41 16.41L4 15L12 7L20 15L18.59 16.42Z" fill={color || "#3C4050"}/>
    </svg>
  )
}

export default ArrowUp
