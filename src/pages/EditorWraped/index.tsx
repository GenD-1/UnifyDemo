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
            className="container"
        // onPointerMove={onCanvasPointerMove}
        // onPointerUp={onCanvasPointerUp}
        >
            <div className='flex mt-2 ml-1.5 justify-end'>
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
            fetchToken(currentUrl[3]);
        }

    }, [hmsActions, isConnected]);

    const fetchRoomId = async () => {
        await fetch("http://192.168.2.113:4001/managementToken")
            .then(res => res.json())
            .then(
                async (result) => {
                    console.log(result);
                    let newUrl = window.location.href + result.roomId
                    setShareUrl(newUrl)
                    setRoomId(result.roomId)
                    await fetchToken(result.roomId)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    const fetchToken = async (room_id: any) => {
        const Id = uuidv1()
        const response = await fetch(`https://prod-in2.100ms.live/hmsapi/unifymarketplace-audio.app.100ms.live/api/token`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: Id,
                role: 'speaker',
                room_id,
            }),
        });

        const { token } = await response.json();

        await hmsActions.join({
            userName: "Demo",
            authToken: token
        });
    }


    return (
        <div>

            <RoomProvider id="react-todo-app" initialPresence={{ shapes: new LiveMap(), }} initialStorage={{ shapes: new LiveMap(), }}>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                <Room url={shareUrl} />
                {/* </Suspense> */}
            </RoomProvider>


            {isConnected &&
                <MicroPhone />
            }
        </div>
    );
}


export default EditorWraped