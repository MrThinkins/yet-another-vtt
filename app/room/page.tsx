'use client'

import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import { FormEvent, useState, useEffect } from "react"

export default function Room() {
  const { userId, getToken } = useAuth()

  const createRoom = useMutation(api.rooms.createRoom)

  const rooms = useQuery(api.rooms.getUserRoomList)

  const [roomName, setRoomName] = useState<string>("")
 
  const createRoomFunction = async (e: FormEvent) => {
    e.preventDefault()
    if (userId) {
      let roomNameToUse = roomName
      if (roomName == "" || roomName == null) {
        roomNameToUse = "Temp Room Name"
      }
      createRoom({
        userId: userId,
        name: roomNameToUse
      })
      setRoomName("")
    }
    console.log(getToken)
  }


  return (
    <div>
      {rooms?.map(({ roomId, name }, index) => (
        <div key={index}>
          <Link href={`/room/${roomId}`}>
            {name}
          </Link>
        </div>
      ))}
      <br></br>
      <form onSubmit={createRoomFunction}>
        <label 
          htmlFor="roomName"
        >
          Room Name:
        </label>
        <input
          id="roomName"
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        ></input>
        <button type="submit">
          Create New Room
        </button>
      </form>

    </div>
  )
}