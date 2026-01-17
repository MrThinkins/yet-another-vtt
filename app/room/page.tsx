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
  const [usePassword, setUsePassword] = useState<boolean>(true)
 
  const createRoomFunction = async (e: FormEvent) => {
    e.preventDefault()
      let roomNameToUse = roomName
      if (roomName == "" || roomName == null) {
        roomNameToUse = "null"
      }
      createRoom({
        name: roomNameToUse,
        usePassword: usePassword
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
          placeholder="Input room name here."
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        ></input>
        <br></br>
        <label htmlFor="usePassword">
          Use Password? (Recommended):
        </label>
        <input 
          type="checkbox"
          id="usePassword"
          checked={usePassword}
          onChange={(e) => setUsePassword(e.target.checked)}
        ></input>
        <br></br>
        <button type="submit">
          Create New Room
        </button>
      </form>

    </div>
  )
}