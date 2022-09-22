import React from 'react';
interface props { length: any }
const AudioPlayer = ({ length }: props) => {
  const audioRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (audioRef.current) {
      if (length === 1) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [length]);
  return <audio autoPlay loop ref={audioRef} src='/temp.mp3'></audio>;
};

export default AudioPlayer;
