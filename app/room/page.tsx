'use client'

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import { FormEvent, useState } from "react"
import Header from "@/components/header"

export default function Room() {
  const createRoom = useMutation(api.rooms.createRoom)

  const rooms = useQuery(api.rooms.getUserRoomList)

  const [roomName, setRoomName] = useState<string>("")
 
  const createRoomFunction = async (e: FormEvent) => {
    e.preventDefault()
      let roomNameToUse = roomName
      if (roomName == "" || roomName == null) {
        roomNameToUse = "Temp Room Name"
      }
      createRoom({
        name: roomNameToUse
      })
      setRoomName("")  
  }


  return (
    <div>
      <Header>
      </Header>
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