import { useAVToggle } from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
import { Mic, MicOff } from 'react-feather'
import Participant from "./Participant";

function MicroPhone({ roomName, room, handleLogout }) {
  const [participants, setParticipants] = useState([]);


  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };




    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);


  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));





  return (
    <div className="control-bar  container mx-auto fixed bottom-[1%] sm:bottom-[7%]  sm:right-1 w-[60%] sm:w-[6.8%] right-0  text-sm"

    >
      {room ? (
        <>
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            isOwner={true}
          />
        </>
      ) : (
        ""
      )}
      <div className="remote-participants">{remoteParticipants}</div>

    </div>
  );
}

export default MicroPhone;