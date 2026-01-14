import { useState } from "react"
import Messages from "./rightSide/messages"
import Settings from "./rightSide/settings"


interface rightSideBarProps {
  roomId: string,
  userId: string
}

export default function RightSideBar({
  roomId,
  userId
}: rightSideBarProps) {
  
  const [partToShow, setPartToShow] = useState<string> ('messages')
  return (
    <div className="rightSideBarGrid">
      <div className="rightSideBarNavGrid">
        <div onClick={() => setPartToShow('messages')} className="cursorPointer material-symbols-outlined">
          chat
        </div>
        <div onClick={() => setPartToShow('settings')} className="cursorPointer material-symbols-outlined">
          settings
        </div>

      </div>
      <div>
        {partToShow == 'messages' ? (
          <Messages
            roomId={roomId}
            userId={userId}
          >
          </Messages>
        ) : (
          <Settings
            roomId={roomId}
            userId={userId}
          >
          </Settings>
        )}
      </div>
    </div>
  )
}