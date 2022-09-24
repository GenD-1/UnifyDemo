import { useUpdateMyPresence, useOthers } from '../liveblocks.config'
import Cursor from './Cursor'

export default function CursorPresence({ children, positionRef }: any) {
  const updateMyPresence = useUpdateMyPresence()
  // console.log("inside wraper abcdX", abcdX);
  // console.log("inside wraper abcdX", abcdY);
  // console.log(positionRef?.current?.getAzimuthalAngle());

  const valueX = positionRef?.current?.getAzimuthalAngle()
  const valueY = positionRef?.current?.getPolarAngle()


  const onPointerMove = (event: any) => {

    // console.log(event.clientX,event.clientY);

    updateMyPresence({
      cursor: {
        x: Number(valueX),
        y: Number(valueY)
      }
    })
  }

  const onPointerLeave = () => {
    updateMyPresence({ cursor: null })
  }

  const others = useOthers()
  const showOther = ({ connectionId, presence, info }: any) => {
    if (!presence?.cursor) {
      return null
    }

    // console.log(presence);

    const x = presence.cursor.x;
    const y = presence.cursor.y;

    positionRef?.current?.setAzimuthalAngle(x)

    positionRef?.current?.setPolarAngle(y)

    // return (
    //   <Cursor key={connectionId} x={x} y={y} />
    // )
  }

  return (
    <div onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        touchAction: 'none'
      }}>
      {others.map(showOther)}
      {children}
    </div>
  )
}