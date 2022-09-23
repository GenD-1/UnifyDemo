import React, { useEffect, useState } from 'react'
import { Mic } from 'react-feather';
import styled from 'styled-components'
import { useDoubleTap } from 'use-double-tap'

import Scene from '../../components/Scene'
import { pendantShowCount, pendantsModelProps } from '../../constants'
import useStore from '../../store'
import Modal from 'react-modal';

import { useBatch, useHistory, useOthers, useMap, useMyPresence } from '../../liveblocks.config'
import { LiveObject } from "@liveblocks/client";
import { Shape } from 'three'
import { selectIsConnectedToRoom, useHMSStore } from '@100mslive/react-sdk';
import Room from '../../components/Room';
import Join from '../../components/Join';

Modal.setAppElement('#root');


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

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '40%'
    },
};

const customStylescopy = {
    content: {
        top: '90%',
        left: '10%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '15%',
        height: '8%',
    },
}

export const Editor = ({ shapes }: any) => {
    const currentPage = useStore((state: any) => state.currentPage)
    const moveToNextPage = useStore((state: any) => state.moveToNextPage)
    const moveToPrevPage = useStore((state: any) => state.moveToPrevPage)


    const [modalIsOpen, setIsOpen] = useState(false);
    const [copyModelOpen, setCopyModelOpen] = useState(false)
    const [token, setToken] = useState('')
    const [url, setUrl] = useState('')


    // useEffect(() => {
    //     handleToken()
    // }, [])

    const handleToken = (active: any) => {
        if (token === '') {
            fetch("http://192.168.2.113:4001/managementToken")
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        setToken(result.token)
                        let newUrl = window.location.href + result.token + '/' + result.roomId
                        setUrl(newUrl)
                        handleModal(active)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        } else {
            handleModal(active)
        }
    }


    const moveToPrev = useDoubleTap((event: any) => {
        if (currentPage > 1)
            moveToPrevPage()
    })

    const moveToNext = useDoubleTap((event: any) => {
        if (currentPage < Math.ceil(pendantsModelProps.length / pendantShowCount))
            moveToNextPage()
    })



    const handleModal = (active: any) => {
        setIsOpen(active);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        setCopyModelOpen(true)
        setTimeout(() => {
            setCopyModelOpen(false)
            handleModal(false)
        }, 2000)
    }

    const SpacesApp = () => {
        const isConnected = useHMSStore(selectIsConnectedToRoom);
        return <>{isConnected ? <Room /> : <Join tokenData={token} />}</>;
    };


    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => handleModal(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='flex flex-col h-full'>
                    <div className='flex'>
                        <div>Share</div>
                        <img onClick={() => handleModal(false)} src='assets/close.png' alt='close' className='w-6 ml-auto cursor-pointer'></img>
                    </div>
                    {/* <div className='flex h-full justify-center items-center'>Link Copied to clipboard</div> */}
                    <div className='flex h-full justify-center items-center'>
                        <div className='w-10/12 bg-[#f9f9f9] h-[35px] border-[1px] border-solid border-black p-[1%] rounded-sm flex justify-between'>
                            <span>{url}</span>
                            <div onClick={handleCopy} className='text-[#065fd4] cursor-pointer'>COPY</div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={copyModelOpen}
                style={customStylescopy}
                contentLabel="Example Modal"
            >
                <div className='flex flex-col'>
                    <div className='flex justify-center items-center'>Link Copied to clipboard</div>
                </div>
            </Modal>


            <div className='overflow-hidden w-screen h-screen flex flex-col'>
                <LogoWrapper className='flex justify-center items-center'>
                    <img src={'assets/BrandLogo_Template.png'} alt='pic'></img>
                </LogoWrapper>

                <CanvasWrapper
                    className={`w-full h-full relative flex justify-center items-center`}
                >
                    <div
                        className={`sceneWrapper`}
                    >
                        <Scene />
                    </div>
                </CanvasWrapper>

                <ActionWrapper>
                    <button onClick={() => handleToken(true)} className='flex flex-col justify-center items-center font-bold'>
                        <img src='assets/ShareIcon.png' alt='pic'></img>
                        Share
                    </button>
                </ActionWrapper>
                <>
                    {/* {token && */}
                    <SpacesApp />
                    {/* } */}
                </>

                <>
                    <PrevArea {...moveToPrev} />
                    <NextArea {...moveToNext} />
                </>
            </div>
        </div>
    )
}

export default Editor