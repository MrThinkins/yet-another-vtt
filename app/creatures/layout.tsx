"use client"

import { PropsWithChildren } from "react"
import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react"

export default function RoomLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <p>Please sign in to view rooms.</p>
      </Unauthenticated>
      <AuthLoading>
        <p>Loading...</p>
      </AuthLoading>
    </>
  )
}