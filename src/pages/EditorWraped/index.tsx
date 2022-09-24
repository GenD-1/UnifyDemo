import { Suspense, useEffect, useState } from "react";

import Avatar from '../../components/Avatar/Avatar';
import { COLORS_PRESENCE } from '../../constants';
import { RoomProvider, useMap, useMyPresence, useOthers } from "../../liveblocks.config";
import Editor from '../Editor';
import { LiveMap } from "@liveblocks/client";
import { v1 as uuidv1 } from 'uuid';
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
    useAVToggle
} from "@100mslive/react-sdk";
import MicroPhone from "../../components/Testing/MicroPhone";

function WhoIsHere({ userCount }: any) {

    return (
        <div className="who_is_here"> {userCount} Live </div>
    );
}

function Room({ url }: any) {

    const others = useOthers();

    return (
        <div
            className="container mx-auto h-[100%]"
        // onPointerMove={onCanvasPointerMove}
        // onPointerUp={onCanvasPointerUp}
        >
            <div className='flex mt-2 ml-1.5 justify-end items-center h-[6%]'>
                <div className='flex'>
                    {others.map(({ connectionId, presence }) => {
                        if (!connectionId) {
                            return null;
                        }

                        return (
                            <Avatar
                                key={connectionId}
                                color={COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]}
                            />
                        );
                    })}
                </div>
                <div className='mx-2'>
                    <WhoIsHere
                        userCount={others.length}
                    />
                </div>
            </div>
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

function EditorWraped() {

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();

    const [shareUrl, setShareUrl] = useState('')
    const [roomid, setRoomId] = useState('')
    const [newToken, setNewToken] = useState('')

    useEffect(() => {

        window.onunload = () => {
            if (isConnected) {
                hmsActions.leave();
            }
        };
        let currentUrl = (window.location.href).split('/')
        if (currentUrl[3] === '') {
            fetchRoomId();
        } else {
            setRoomId(currentUrl[3]);
            // fetchToken(currentUrl[3])
        }

    }, [hmsActions, isConnected]);

    const fetchRoomId = async () => {
        await fetch("http://localhost:4001/managementToken")
            .then(res => res.json())
            .then(
                async (result) => {
                    console.log(result);
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
                room_id: roomid,
            }),
        });

        const { token } = await response.json();
        let newUrl = window.location.protocol + window.location.host + "/" + roomid
        setShareUrl(newUrl)

        handleJoint(token)
    }

    const handleJoint = async (token: any) => {
        await hmsActions.join({
            userName: 'result',
            authToken: token
        });
    }


    return (
        <div className='h-full'>

            <RoomProvider id="react-todo-app" initialPresence={{ shapes: new LiveMap(), }} initialStorage={{ shapes: new LiveMap(), }}>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                <Room url={shareUrl} />
                {/* </Suspense> */}
            </RoomProvider>


            {isConnected ?
                <MicroPhone /> :
                <div className="control-bar">
                    <button className="btn-control" onClick={fetchToken}>
                        start
                    </button>
                </div>
            }
        </div>
    );
}


export default EditorWraped