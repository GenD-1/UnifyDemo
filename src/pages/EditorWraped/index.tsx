import { Suspense, useCallback, useEffect, useState } from "react";

import Avatar from '../../components/Avatar/Avatar';
import { COLORS_PRESENCE } from '../../constants';
import { RoomProvider, useMap, useMyPresence, useOthers } from "../../liveblocks.config";
import Editor from '../Editor';
import { LiveMap } from "@liveblocks/client";
import { v1 as uuidv1 } from 'uuid';
import Video from "twilio-video";
// import {
//     selectIsConnectedToRoom,
//     useHMSActions,
//     useHMSStore,
//     useAVToggle
// } from "@100mslive/react-sdk";
import MicroPhone from "../../components/Testing/MicroPhone";


function Room({ url }: any) {

    return (
        <div
            className="container mx-auto h-[100%]"
        >
            <PageShow shareUrl={url} />
        </div>
    );
}

function PageShow({ shareUrl }: any) {
    const shapes = useMap("shapes");

    if (shapes === null || shapes === undefined) {
        return (
            <div className="loading">
                <img src="https://liveblocks.io/loading.svg" alt="Loading" />
            </div>
        );
    } else {
        return <Editor shapes={shapes} shareUrl={shareUrl} />;
    }
}

function EditorWraped({ roomName }: any) {

    // const isConnected = useHMSStore(selectIsConnectedToRoom);
    // const hmsActions = useHMSActions();

    const [shareUrl, setShareUrl] = useState('');

    const [room, setRoom] = useState(null);
    const [connecting, setConnecting] = useState(false);



    useEffect(() => {
        window.onunload = () => {
            if (room) {
                handleLogout();
            }
        };
    }, []);


    const handleSubmit = useCallback(
        async (event: any) => {
            event.preventDefault();
            setConnecting(true);
            const data = await fetch("https://twilioaudiobackend.herokuapp.com/join-room", {
                method: "POST",
                body: JSON.stringify({

                    roomName: roomName,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                console.log(res);
                return res.json()
            });


            Video.connect(data.token, {
                name: roomName,
            })
                .then((room: any) => {
                    setConnecting(false);
                    setRoom(room);
                    console.log("Room", room)
                    let newUrl = window.location.protocol + "//" + window.location.host + "/" + room.sid + "/" + roomName
                    console.log(newUrl);
                    setShareUrl(newUrl)

                })
                .catch((err) => {
                    console.error(err);
                    setConnecting(false);
                });
        },
        [roomName]
    );


    const handleLogout = useCallback(() => {
        setRoom((prevRoom: any) => {
            if (prevRoom) {
                prevRoom.localParticipant.tracks.forEach((trackPub: any) => {
                    trackPub.track.stop();
                });
                prevRoom.disconnect();
            }
            return null;
        });
    }, []);

    // useEffect(() => {
    //     let currentUrl = (window.location.href).split('/')

    //     if (currentUrl[3] === '') {
    //         fetchRoomId();
    //     } else {
    //         setRoomId(currentUrl[3]);
    //     }

    // }, [])

    useEffect(() => {
        if (room) {
            const tidyUp = (event: any) => {
                if (event.persisted) {
                    return;
                }
                if (room) {
                    handleLogout();
                }
            };
            window.addEventListener("pagehide", tidyUp);
            window.addEventListener("beforeunload", tidyUp);
            return () => {
                window.removeEventListener("pagehide", tidyUp);
                window.removeEventListener("beforeunload", tidyUp);
            };
        }
    }, [room, handleLogout]);








    return (
        <div className='h-[97%]'>
            {roomName &&

                <RoomProvider id={roomName} initialPresence={{ cursor: null, model: null, currentPage: null }} initialStorage={{ shapes: new LiveMap(), }}>

                    <Room url={shareUrl} />

                </RoomProvider>

            }

            {
                room ?
                    <MicroPhone roomName={roomName} room={room} handleLogout={handleLogout} /> :
                    <div className="control-bar container mx-auto fixed bottom-[1%] sm:bottom-[11%] md:bottom-[9%] sm:right-1 sm:w-[7%] w-[60%] right-0  text-sm">
                        <button className="btn-control" onClick={handleSubmit}>
                            Start
                        </button>
                    </div>
            }
        </div >
    );
}


export default EditorWraped