import { Suspense } from "react";
import Avatar from '../../components/Avatar/Avatar';
import { COLORS_PRESENCE } from '../../constants';
import { RoomProvider, useMap, useMyPresence, useOthers } from "../../liveblocks.config";
import Editor from '../Editor';
import { LiveMap } from "@liveblocks/client";
import Join from "../../components/Join";
import Room from "../../components/Room";
import { HMSRoomProvider, selectIsConnectedToRoom, useHMSStore } from "@100mslive/react-sdk";


function WhoIsHere({ userCount }: any) {

    return (
        <div className="who_is_here"> {userCount} Live </div>
    );
}

function Rooms() {

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
            <PageShow />
        </div>
    );
}

function PageShow() {
    const shapes = useMap("shapes");

    if (shapes === null || shapes === undefined) {
        return (
            <div className="loading">
                <img src="https://liveblocks.io/loading.svg" alt="Loading" />
            </div>
        );
    } else {
        return <Editor shapes={shapes} />;
    }
}

function EditorWraped() {

    // function useOverrideRoomId(roomId: string) {
    //     const query = Math.floor(100000 + Math.random() * 900000);
    //     const overrideRoomId = useMemo(() => {
    //         return query ? `${roomId}-${query}` : roomId;
    //     }, [query, roomId]);

    //     return overrideRoomId;
    // }


    // const roomId = useOverrideRoomId("react-todo-apps-test");

    return (
        <HMSRoomProvider>
            <RoomProvider id="react-todo-app" initialPresence={{ shapes: new LiveMap(), }} initialStorage={{ shapes: new LiveMap(), }}>
                <Suspense fallback={<div>Loading...</div>}>
                <Rooms />
                </Suspense>
            </RoomProvider>
        </HMSRoomProvider>
    );
}


export default EditorWraped