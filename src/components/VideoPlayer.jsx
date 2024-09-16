import React from 'react'

const VideoPlayer = () => {
  return (
    <div>
      <video width={1300}  controls autoPlay muted loop>
        <source src='/videos/essentials.mp4' type='video/mp4'/>
      </video>
    </div>
  )
}

export default VideoPlayer

