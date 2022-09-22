import { useState } from 'react'
import { Mic } from 'react-feather';
import styled from 'styled-components'
import { useDoubleTap } from 'use-double-tap'

import Scene from '../../components/Scene'
import { pendantShowCount, pendantsModelProps } from '../../constants'
import useStore from '../../store'


const CanvasWrapper = styled.div`
    height: calc(90% - 40px);

    .sceneWrapper {
        width: 100%;
        height: 100%;
    }

    &.active {
        height: 60%;
        margin-bottom: 5vh;
        
        .sceneWrapper {
            width: 50%;
        }
    }
`

const Area = styled.div`
    position: absolute;
    top: 0;
    background-color: white;
    width: 25vw;
    height: 25vw;
    cursor: pointer;
    opacity: 0;
`

const PrevArea = styled(Area)`
    display: block;
    left: 0;
`

const NextArea = styled(Area)`
    right: 0;
`

const LogoWrapper = styled.div`
    position: relative;
    max-height: 10%;
    padding: 20px 0;

    img {
        max-width: 80%;
        max-height: 100%;
    }
`

const ActionWrapper = styled.div`
    position: fixed;
    right: 1%;
    bottom: 1%;

    img {
        width: 50%;
    }
`

export const Editor = () => {
    // const [url, setUrl] = useState('');
    // const [id, setId] = useState(Math.floor(100000 + Math.random() * 900000))
    const currentPage = useStore((state: any) => state.currentPage)
    const moveToNextPage = useStore((state: any) => state.moveToNextPage)
    const moveToPrevPage = useStore((state: any) => state.moveToPrevPage)

    // socket.on("connect", () => {
    //     console.log(socket.id);
    // });

    // socket.on("disconnect", () => {
    //     console.log(socket.id);
    // });

    // socket.on("reciveAudio", (data) => {
    //     if (data.id !== id) {
    //         console.log(id);
    //         console.log("data recives", data);
    //     }
    // })







    const moveToPrev = useDoubleTap((event: any) => {
        if (currentPage > 1)
            moveToPrevPage()
    })

    const moveToNext = useDoubleTap((event: any) => {
        if (currentPage < Math.ceil(pendantsModelProps.length / pendantShowCount))
            moveToNextPage()
    })


    // const getAudio = async () => {
    //     let chunks: Array<any> = [];
    //     let recorder: any;

    //     try {
    //         let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //         recorder = new MediaRecorder(stream);
    //         recorder.ondataavailable = (e: any) => {


    //             chunks.push(e.data);


    //             let blob = new Blob(chunks, { type: "audio/webm" });
    //             let testAudioRecord = URL.createObjectURL(blob);
    //             socket.emit("audioData", { chunks: testAudioRecord, id: id });

    //             console.log(testAudioRecord);

    //         };
    //         recorder.start(3000);

    //         // setTimeout(() => {
    //         //     recorder.stop(); //   Cannot read ('stop') =error
    //         // }, 2000);
    //     } catch (e) {
    //         console.log("error getting stream", e);
    //     }
    // };

    return (
        <div className='overflow-hidden w-screen h-screen flex flex-col'>



            <LogoWrapper className='flex justify-center items-center'>
                <img src={'assets/BrandLogo_Template.png'} alt='pic'></img>
            </LogoWrapper>

            <CanvasWrapper
                className={`w-full h-full relative flex justify-center items-center`}
            >
                <div className={`sceneWrapper`}>
                    <Scene />
                </div>
            </CanvasWrapper>

            <ActionWrapper className='flex flex-row justify-between w-32'>

                {/* <button className="flex items-center font-bold " onClick={getAudio}>
                    <Mic /></button>
                {url && <audio controls src={url} />} */}
                <button className='flex flex-col justify-center items-center font-bold'>
                    <img src='assets/ShareIcon.png' alt='pic'></img>
                    Share
                </button>


            </ActionWrapper>

            <>
                <PrevArea {...moveToPrev} />
                <NextArea {...moveToNext} />
            </>



        </div>
    )
}

export default Editor