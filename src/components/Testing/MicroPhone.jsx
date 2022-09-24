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
    <div className="control-bar container mx-auto absolute bottom-[10%] right-0 w-[6%]"
    // width: 70px;
    // position: absolute;
    // bottom: 10%;
    // right: 0;"
    >
      <button className="btn-control" onClick={toggleAudio}>
        {isLocalAudioEnabled ? "Mute" : "Unmute"}
      </button>
    </div>
  );
}

export default MicroPhone;
