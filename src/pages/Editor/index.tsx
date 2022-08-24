import { useState } from 'react'
import styled from 'styled-components'
import { useDoubleTap } from 'use-double-tap'
import Scene from '../../components/Scene'
import { pendantShowCount, pendantsModelProps } from '../../constants'
import useStore from '../../store'

const CanvasWrapper = styled.div`
    height: 100%;

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

const ItemTitle = styled.div`
    font-size: 45px;
    color: white;
    height: 0%;
    opacity: 0;
    padding: 0;
    transition: opacity 1s;
    overflow: hidden;

    &.active {
        opacity: 1;
        height: 15%;
        padding: 1rem;
    }
`

const VideoWrapper = styled.div`
    height: 0%;
    overflow: hidden;
    opacity: 0;
    transition: opacity 1s;

    &.active {
        height: 20%;
        opacity: 1;
    }
`

const AssetItem = styled.div`
    color: white;
    background: #4173a480;
    width: 30%;
    height: 80%;
    margin: 0 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    img, video {
        max-height: 100%;
    }
`

const Description = styled.div`
    width: 0%;
    height: 100%;
    background: #4173a480;
    color: white;
    opacity: 0;
    transition: opacity 1s;
    overflow: hidden;
    font-size: 20px;
    text-align: center;

    &.active {
        width: 50%;
        overflow: auto;
        padding: 1rem;
        opacity: 1;
    }
`

const AssetViewer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: none;
    opacity: 0;
    transition: all 1s;

    .backdrop {
        background: #112233c2;
    }

    .assetWrapper {
        transform: translate3d(-50%, -50%, 0);
        top: 50%;
        left: 50%;
        width: 80%;
    }

    &.active {
        display: block;
        opacity: 1;
    }
`

export const Editor = () => {
    const currentPage = useStore((state: any) => state.currentPage)
    const moveToNextPage = useStore((state: any) => state.moveToNextPage)
    const moveToPrevPage = useStore((state: any) => state.moveToPrevPage)
    const focusInfo = useStore((state: any) => state.focusInfo)

    const [ focusAsset, setFocusAsset ] = useState() as any

    const moveToPrev = useDoubleTap((event: any) => {
        if( currentPage > 1 )
            moveToPrevPage()
    })

    const moveToNext = useDoubleTap((event: any) => {
        if( currentPage < Math.ceil( pendantsModelProps.length / pendantShowCount )  )
            moveToNextPage()
    })

    return (
        <div className='overflow-hidden w-screen h-screen flex flex-col'>
            <ItemTitle className={`text-center p-4 flex justify-center items-center ${ focusInfo.isFocus ? 'active' : '' }`}>
                { focusInfo.detailInfo ? focusInfo.detailInfo.name : '' }
            </ItemTitle>
            <CanvasWrapper 
                className={`w-full h-full relative flex justify-center items-center ${ focusInfo.isFocus ? 'active' : '' } px-2`} 
            >
                <div className={`sceneWrapper`}>
                    <Scene />
                </div>

                <Description className={`${ focusInfo.isFocus ? 'active' : '' }`}>
                    { focusInfo.detailInfo ? focusInfo.detailInfo.description : '' }
                </Description>

                { !focusInfo.isFocus ? (
                    <>
                        <PrevArea {...moveToPrev} />
                        <NextArea {...moveToNext} />
                    </>
                ) : null }
            </CanvasWrapper>
            <VideoWrapper className={`flex items-center justify-center ${ focusInfo.isFocus ? 'active' : '' }`}>
                { focusInfo.detailInfo ? (
                    focusInfo.detailInfo.assets.map((item: any, index: number) => (
                        <AssetItem className='p-2' key={ `assetItem${ index }` } onClick={ () => setFocusAsset( item ) }>
                            { item.type === 'video' ? (
                                <video src={ item.src } ></video>
                            ) : (
                                <img alt="pic" src={ item.src } />
                            ) }
                        </AssetItem>
                    ))
                ) : null }
            </VideoWrapper>


            <AssetViewer className={`${ focusAsset ? 'active' : '' }`} onClick={ () => setFocusAsset( null ) }>
                <div className='backdrop w-full h-full'></div>

                <div className='assetWrapper absolute'>
                    { focusAsset ? (
                        focusAsset.type === 'video' ? (
                            <video src={ focusAsset.src } muted autoPlay ></video>
                        ) : (
                            <img alt="pic" src={ focusAsset.src } />
                        )
                    ) : null }
                </div>
            </AssetViewer>
        </div>
    )
}

export default Editor