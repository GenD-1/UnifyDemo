import React from 'react';
interface props { length: any }
const AudioPlayer = ({ length }: props) => {
  const audioRef = React.useRef<any>(null);
  React.useEffect(() => {
    loadAudio()
  }, [length]);

  const loadAudio = async () => {
    if (audioRef.current) {
      if (length === 1) {
        await audioRef.current.play();
      } else {
        await audioRef.current.pause();
      }
    }
  }
  return <audio autoPlay loop ref={audioRef} src='http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3'></audio>;
};



export default AudioPlayer;
