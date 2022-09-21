import { Canvas } from '@react-three/fiber'
import { ambientLightProps, backgroundColor, cameraProps, modelScaleValue, orbitControlProps, spotLightProps, spotLightProps2 } from '../../constants/scene'
import useStore from '../../store'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import Model from './model'
import ChainModel from './chain'
import { Loader } from './Loader'
import { chainModelProps, pendantsModelProps } from '../../constants'
import { ZoomControl } from './CameraControl/ZoomControl'
import { ang2Rad } from '../../helper/math'
import { useHistory, useMyPresence, useRoom } from '../../liveblocks.config'
import { LiveObject } from "@liveblocks/client";

export const Scene = () => {
    const dragInfo = useStore((state: any) => state.dragInfo)
    const focusInfo = useStore((state: any) => state.focusInfo)
    const scaleValue = modelScaleValue

    useEffect(() => {
        console.log(scaleValue);
        // onCanvasPointerMove()
    }, [dragInfo])

    // const [{ selectedShape }, setPresence] = useMyPresence();
    // const [isDragging, setIsDragging] = useState(false);
    // const history = useHistory();


    // const room = useRoom();

    // const shape = new LiveObject({
    //     x: 300,
    //     y: 300,
    //     fill: "pink",
    // });
    
    // useEffect(() => {
    //     function onChange() {
    //         setShapeData(shape.toObject());
    //     }

    //     return room.subscribe(shape, onChange);
    // }, [room, shape]);



    // const [{ x, y, fill }, setShapeData] = useState(shape.toObject());



    // const onShapePointerDown = (e: any) => {
    //     history.pause();
    //     e.stopPropagation();

    //     // setPresence({ selectedShape: shapeId }, { addToHistory: true });

    //     setIsDragging(true);
    // };

    // const onCanvasPointerMove = (e: any) => {
    //     e.preventDefault();

    //     if (isDragging) {
    //         if (shape) {
    //             shape.update({
    //                 x: e.clientX - 50,
    //                 y: e.clientY - 50,
    //             });
    //         }
    //     }
    // };




    return (
        <Canvas
            gl={{ antialias: true, alpha: true, }}
            camera={{ fov: cameraProps.fov, position: [cameraProps.position.x, cameraProps.position.y, cameraProps.position.z] }}
            shadows
        >
            <color attach="background" args={[backgroundColor]} />

            <ambientLight
                color={ambientLightProps.color}
            />

            <spotLight
                color={spotLightProps.color}
                castShadow={spotLightProps.castShadow}
                position={[-spotLightProps.position.x, spotLightProps.position.y, spotLightProps.position.z]}
                intensity={spotLightProps.intensity}
            />

            <spotLight
                color={spotLightProps.color}
                castShadow={spotLightProps.castShadow}
                position={[-spotLightProps.position.x, spotLightProps.position.y, -spotLightProps.position.z]}
                intensity={spotLightProps.intensity}
            />

            <spotLight
                color={spotLightProps2.color}
                castShadow={spotLightProps2.castShadow}
                position={[-spotLightProps2.position.x, spotLightProps2.position.y, spotLightProps2.position.z]}
                intensity={spotLightProps2.intensity}
            />

            <spotLight
                color={spotLightProps2.color}
                castShadow={spotLightProps2.castShadow}
                position={[-spotLightProps2.position.x, spotLightProps2.position.y, -spotLightProps2.position.z]}
                intensity={spotLightProps2.intensity}
            />

            <OrbitControls
                minPolarAngle={focusInfo.isFocus ? ang2Rad(0) : orbitControlProps.minPolarAngle}
                maxPolarAngle={focusInfo.isFocus ? ang2Rad(360) : orbitControlProps.maxPolarAngle}
                minAzimuthAngle={focusInfo.isFocus ? -Infinity : orbitControlProps.minAzimuthAngle}
                maxAzimuthAngle={focusInfo.isFocus ? Infinity : orbitControlProps.maxAzimuthAngle}
                maxDistance={orbitControlProps.maxDistance}
                minDistance={orbitControlProps.minDistance}
                target={focusInfo.isFocus ? focusInfo.position : orbitControlProps.target}
                enabled={!dragInfo.isDragging}
                enablePan={false}
            />

            <Suspense fallback={<Loader />}>
                {!focusInfo.isFocus ? (
                    <ChainModel
                        url={chainModelProps.src}
                        position={chainModelProps.position}
                        scale={[scaleValue, scaleValue, scaleValue]}
                    />
                ) : null}

                {pendantsModelProps.map((item: any, index: number) => (
                    <Model
                        key={`pendantsmodel${index}`}
                        url={item.src}
                        scale={[scaleValue, scaleValue, scaleValue]}
                        drawable={item.drawable}
                        page={item.page}
                        index={item.pageIndex}
                        small={item.small}
                        meshPosition={item.meshPosition}
                        meshSize={item.meshSize}
                        id={item.id}
                        modelInfo={item}
                    />
                ))}

                {/* <mesh position={[0, 0.07, 0]}>
                    <boxGeometry args={[0.04, 0.04, 0.001]} />
                    <meshBasicMaterial color={'red'} />
                </mesh> */}
            </Suspense>

            <ZoomControl />
        </Canvas>
    )
}

export default Scene