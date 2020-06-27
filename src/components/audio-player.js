import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/src/styles.scss'

const Player = ({ source }) => {
  const playHandler = e => {
    const audioElements = document.getElementsByTagName('audio')
    if (audioElements.length > 1) {
      for (const item of audioElements) {
        if (item !== e.target) {
          item.pause();
        }
      }
    }
  }

  return (
    <AudioPlayer
      style={{ marginBottom: "2rem" }}
      src={source}
      preload={'metadata'}
      layout="horizontal-reverse"
      customAdditionalControls={[]}
      onPlay={e => playHandler(e)}
    />
  )
}

export default Player
