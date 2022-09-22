import React, { useMemo } from 'react';
import { Suspense } from "react";
import { RoomProvider, useOthers } from "../../liveblocks.config";
import Editor from '../Editor';

import {
    HMSRoomProvider,
    useHMSStore,
    selectIsConnectedToRoom,
} from '@100mslive/hms-video-react';
import Join from '../../components/Join';
import Room from '../../components/Room';

const SpacesApp = () => {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    return <>{isConnected ? <Room /> : <Join />}</>;
};



function WhoIsHere() {
    const userCount = useOthers((others) => others.length);
    const userCo = useOthers((others) => { console.log("others", others) });



    return (
        <div className="who_is_here">There are {userCount} other users online</div>
    );
}

// function Room() {
//     return (
//         <div className="container">
//             <WhoIsHere />
//         </div>
//     );
// }

function EditorWrapedWithLiveBlock() {


    function useOverrideRoomId(roomId: string) {
        const query = Math.floor(100000 + Math.random() * 900000);
        const overrideRoomId = useMemo(() => {
            return query ? `${roomId}-${query}` : roomId;
        }, [query, roomId]);

        return overrideRoomId;
    }


    const roomId = useOverrideRoomId("react-todo-apps-test");
    console.log("randi", roomId)


    return (

        <RoomProvider id="react-todo-apps-test" initialPresence={{ selectedCell: null, }}>
            <Suspense fallback={<div>Loading...</div>}>
                <WhoIsHere />
                <Editor />
                <SpacesApp />
            </Suspense>
        </RoomProvider>
    );
}


export default EditorWrapedWithLiveBlock