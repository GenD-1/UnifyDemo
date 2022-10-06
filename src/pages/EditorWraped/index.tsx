import { useEffect, useState } from "react";
import { RoomProvider, useMap } from "../../liveblocks.config";
import Editor from '../Editor';
import { LiveMap } from "@liveblocks/client";
import { v1 as uuidv1 } from 'uuid';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
    selectIsLocalAudioEnabled
} from "@100mslive/react-sdk";
import AudioButton from "../../components/Testing/MicroPhone";


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

    if(shapes === null || shapes === undefined) {
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

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
    const hmsActions = useHMSActions();

    const [shareUrl, setShareUrl] = useState('')
    const [roomId, setRoomId] = useState('')

    useEffect(() => {

        window.onunload = () => {
            if(isConnected) {
                hmsActions.leave();
            }
        };

    }, [hmsActions, isConnected]);

    useEffect(() => {
        let currentUrl = (window.location.href).split('/')

        if(currentUrl[3] === '') {
            fetchRoomId();
        } else {
            setRoomId(currentUrl[3]);
        }
        fetchToken()
    }, [])


    const fetchRoomId = async () => {
        await fetch("https://backend-unify.herokuapp.com/managementToken")
            .then(res => res.json())
            .then(
                async (result) => {
                    setRoomId(result.roomId)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    const fetchToken = async () => {


        const Id = uuidv1()
        const response = await fetch(`https://prod-in2.100ms.live/hmsapi/unifymarketplace-audio.app.100ms.live/api/token`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: Id,
                role: 'speaker',
                room_id: roomId,
            }),
        });

        const { token } = await response.json();


        let newUrl = window.location.protocol + "//" + window.location.host + "/" + roomId + "/" + roomName
        console.log(newUrl);
        setShareUrl(newUrl)
        await hmsActions.unblockAudio();
        handleJoint(token)
    }

    const handleJoint = async (token: any) => {
        await hmsActions.join({
            userName: 'result',
            authToken: token,
            settings: {
                isAudioMuted: true,
            },
        });
    }


    return (
        <div className='h-[97%]'>
            {roomName &&

                <RoomProvider id={roomName} initialPresence={{ cursor: null, model: null, currentPage: null }} initialStorage={{ shapes: new LiveMap(), }}>

                    <Room url={shareUrl} />

                </RoomProvider>

            }

            {
                isConnected &&
                <AudioButton
                    active={isLocalAudioEnabled}
                    onClick={() => {
                        hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
                    }}
                />
            }
        </div >
    );
}


export default EditorWraped