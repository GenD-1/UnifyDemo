import { Suspense, useEffect } from "react";
import Avatar from '../../components/Avatar/Avatar';
import { COLORS_PRESENCE } from '../../constants';
import { RoomProvider, useMap, useMyPresence, useOthers } from "../../liveblocks.config";
import Editor from '../Editor';
import { LiveMap } from "@liveblocks/client";

import Conference from "../../components/Testing/Conference";
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
    useAVToggle
  } from "@100mslive/react-sdk";
import Footer from "../../components/Testing/Footer";
import JoinForm from "../../components/Testing/JoinForm";

function WhoIsHere({ userCount }: any) {

    return (
        <div className="who_is_here"> {userCount} Live </div>
    );
}

function Room() {

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

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();

    useEffect(() => {
        
        window.onunload = () => {
            if (isConnected) {
                hmsActions.leave();
            }
        };
        
        joinTheRoom();

    }, [hmsActions, isConnected]);
    
    const joinTheRoom = async () => {
        await hmsActions.join({
            userName: "Demo",
            authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjMyYjQyY2NlMDg4NjNhM2YyZjZjZDg3Iiwicm9vbV9pZCI6IjYzMmQ5YzgyNzA4NGI1OWY2M2E3OWRjZSIsInVzZXJfaWQiOiI2MzJiNDJjY2UwODg2M2EzZjJmNmNkODQiLCJyb2xlIjoic3BlYWtlciIsImp0aSI6IjU0OTM4NzFhLWM2Y2EtNDIzOC1hNmM2LTA0YTZhNDczOTQ1NyIsInR5cGUiOiJhcHAiLCJ2ZXJzaW9uIjoyLCJleHAiOjE2NjQwMTk5NzF9.9W3ZOOz1FwGuTfqtaS2hoTKUxSJ5dYPBxPGDD0Jacxk"
        });
    } 

    
    return (
        <div>
            
            {isConnected && 
                <Footer />
            }

            <RoomProvider id="react-todo-app" initialPresence={{ shapes: new LiveMap(), }} initialStorage={{ shapes: new LiveMap(), }}>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                <Room />
                {/* </Suspense> */}
            </RoomProvider>
            
        </div>
    );
}


export default EditorWraped