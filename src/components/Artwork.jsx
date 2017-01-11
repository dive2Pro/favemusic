// @flow
import React from 'react'

const Artwork = ({ alt, image, optionalImg, size }: ArtworkPropsType) => (
  <img src={image || optionalImg} alt={alt} height={size} width={size} />
)
export default Artwork
