import React from 'react'

const Artwork = ({ alt, image, optionalImg, size }) => (
  <img src={image || optionalImg} alt={alt} height={size} width={size} />
)
export default Artwork
