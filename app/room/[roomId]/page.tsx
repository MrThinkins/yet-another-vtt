'use client'

import { use } from 'react'
import './room.css'
import RightSideBar from '@/components/room/rightSideBar'
import { useAuth } from '@clerk/clerk-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

interface RoomProps {
  params: Promise<{
    roomId: string
  }>
}

export default function Room( { params }: RoomProps ) {
  const param = use(params)
  const { userId } = useAuth()
  const { roomId } = param
  const aloudInRoom = useQuery(api.rooms.getRoom, { roomId: Number(roomId), userId: String(userId) })

  console.log(userId)
  console.log(`in room: ${aloudInRoom}`)

  function toggleRightSide() {
    document.querySelector('.mainGrid')?.classList.toggle('collapsed')
  }

  return (
    <div>
    {aloudInRoom == true ? (
    <div className="mainGrid">
      <div>
        Hello, welcome to roomId: { roomId }
        <div onClick={toggleRightSide} className="rightSideToggler material-symbols-outlined">
          menu
        </div>
      </div>
      <div className="rightSideBar">
        <RightSideBar
          roomId={roomId}
          userId={userId || ''}
        >
        </RightSideBar>
      </div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </div>
    ) : (
    <div>
      You are not aloud in this room
    </div>
    )}
    </div>  
  )
}