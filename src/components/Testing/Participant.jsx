import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "react-feather";

const Participant = ({ participant, isOwner }) => {

    const [audioTracks, setAudioTracks] = useState([]);
    const [isAudioMute, setIsAudioMute] = useState(true);


    const audioRef = useRef();

    const trackpubsToTracks = (trackMap) =>
        Array.from(trackMap.values())
            .map((publication) => publication.track)
            .filter((track) => track !== null);

    useEffect(() => {

        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        const trackSubscribed = (track) => {

            if (track.kind === "audio") {
                setAudioTracks((audioTracks) => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = (track) => {

            if (track.kind === "audio") {
                setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
            }
        };

        participant.on("trackSubscribed", trackSubscribed);
        participant.on("trackUnsubscribed", trackUnsubscribed);

        return () => {

            setAudioTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);



    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current);
            return () => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);


    const muteAudio = () => {
        setIsAudioMute(!isAudioMute)
        if (isAudioMute) {
            participant.audioTracks.forEach(track => {
                console.log(track);
                track.track.enable();
            });
        }

        else {
            participant.audioTracks.forEach(track => {
                console.log(track);
                console.log("participant", participant);
                track.track.disable();
            });
        }
    }

    return (
        <div className="participant" onClick={muteAudio}  >
            {/* <h3>{participant.identity}</h3>           */}
            {!isOwner && <audio ref={audioRef} autoPlay={true} muted={false} />}
            {isOwner && <button >{isAudioMute ? <MicOff size={25} /> : <Mic size={25} />}</button>}
        </div>
    );
};

export default Participant;
