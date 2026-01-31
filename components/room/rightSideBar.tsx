import { useState } from "react"
import Messages from "./rightSide/messages"
import Settings from "./rightSide/settings"
import Maps from "./rightSide/maps"
import Tokens from "./rightSide/tokens"


interface rightSideBarProps {
  roomId: number
}

export default function RightSideBar({
  roomId
}: rightSideBarProps) {
  
  const [partToShow, setPartToShow] = useState<string> ('messages')
  return (
    <div className="rightSideBarGrid">
      <div className="rightSideBarNavGrid">
        <div 
          onClick={() => setPartToShow('messages')} 
          className="cursorPointer material-symbols-outlined"
        >
          chat
        </div>
        <div
          onClick={() => setPartToShow('maps')}
          className="cursorPointer material-symbols-outlined"
        >
          map
        </div>
        <div onClick={() => setPartToShow('tokens')} className="cursorPointer material-symbols-outlined">
          token
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
        ) : partToShow == 'maps' ? (
          <Maps
            roomId={roomId}
          >
          </Maps>
        ) : partToShow == "tokens" ? (
          <Tokens
            roomId={roomId}
          >
          </Tokens>
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