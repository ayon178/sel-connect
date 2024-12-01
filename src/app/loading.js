'use client'

import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import lottieJson from '../assets/animation/lottie.json'

const loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Player
        autoplay
        loop
        src={lottieJson}
        style={{ height: '200px', width: '200px' }}
      ></Player>
    </div>
  )
}

export default loading
