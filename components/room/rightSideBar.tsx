import { useState } from "react"
import Messages from "./rightSide/messages"
import Settings from "./rightSide/settings"


interface rightSideBarProps {
  roomId: string
}

export default function RightSideBar({
  roomId
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
      <div
        className="rightSideBarContent"
      >
        {partToShow == 'messages' ? (
          <Messages
            roomId={roomId}
          >
          </Messages>
        ) : (
          <Settings
            roomId={roomId}
          >
          </Settings>
        )}
      </div>
    </div>
  )
}