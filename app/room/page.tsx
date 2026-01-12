'use client'

import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Room() {
  const urlPath = usePathname()
  const { userId } = useAuth()
  const createRoom = useMutation(api.rooms.createRoom)

  function createRoomFunction() {
    if (userId) {
      createRoom({
        userId: userId
      })
    }
  }

  return (
    <div>
      <br></br>
      <button onClick={createRoomFunction}>
        Create New Room
      </button>
    </div>
  )
}