import React from 'react'
// import Logo1 from '../assets/logo/Logo1'
// import Logo2 from '../assets/logo/Logo2'
import Logo3 from '../assets/logo/Logo3'

const Logo = (props: any) => {
  const { color, size } = props;

  return (
    <Logo3 color={color} size={size} />
  )
}

export default Logo
