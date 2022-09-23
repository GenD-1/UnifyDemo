import { useAVToggle } from "@100mslive/react-sdk";
import { useEffect, useState } from "react";

function MicroPhone() {

  const [checkFirstTimeAudioEnable, setCheckFirstTimeAudioEnable] = useState(false)
  const {
    isLocalAudioEnabled,
    toggleAudio
  } = useAVToggle();

  useEffect(() => {
    if (isLocalAudioEnabled && !checkFirstTimeAudioEnable) {
      toggleAudio()
      setCheckFirstTimeAudioEnable(true)
    }
  }, [isLocalAudioEnabled])


  return (
    <div className="control-bar">
      <button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? "Mute" : "Unmute"}
      </button>
    </div>
  );
}

export default MicroPhone;
