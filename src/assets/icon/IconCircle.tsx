import React from 'react'
import { lavender } from '../../constants/Color';

const IconCircle = (props: any) => {
  const {
    image,
    size,
  } = props;
  const styles = {
    container: {
      width: size,
      height: size,
      borderRadius: size/2,
      backgroundColor: lavender
    }
  }

  const getImage = (image: string) => {
    switch (image) {
      case 'apple':
        return require('./AppleCircle.png').default
      case 'google':
        return require('./GoogleCircle.png').default
      case 'facebook':
        return require('./FacebookCircle.png').default
      case 'naver':
        return require('./NaverCircle.png').default
      case 'kakaotalk':
        return require('./KakaotalkCircle.png').default
      default:
        return null
    }
  }

  return (
    <div style={styles.container}>
      <img src={getImage(image)} alt="Can't find Icon" width={size}/>
    </div>
  )
}

export default IconCircle
