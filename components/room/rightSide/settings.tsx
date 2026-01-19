import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface settingsProps {
  roomId: string
}

export default function Settings({
  roomId
}: settingsProps) {
  const deleteRoom = useMutation(api.rooms.deleteRoom)
  const passwordInfo = useQuery(api.rooms.getRoomPasswordInfo, { roomId: Number(roomId) })
  const isOwner = useQuery(api.rooms.getIsOwner, { roomId: Number(roomId) })
  const toggleUsePassword = useMutation(api.rooms.toggleUsePassword)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  function deleteRoomFunction() {
    const confirmRoomDelete = confirm("Are you sure that you want to delete the room?")

    if (confirmRoomDelete) {
      deleteRoom({ roomId: Number(roomId) })
    }
    router.push('./')
  }

  function toggleUsePasswordFunction() {
    toggleUsePassword({ roomId: Number(roomId) })
  }
  return (
    <div>
      <Link href="../">
        Exit
      </Link>
      <br></br>
      {isOwner ? (
        <div>
          <label
            htmlFor="usePassword"
          >
            Use Password: 
          </label>
          <input 
            type="checkbox" 
            id="usePassword"
            checked={passwordInfo?.usePassword}
            onChange={toggleUsePasswordFunction}
          >
          </input>
          {passwordInfo?.usePassword ? (
            <div>
              <label
                htmlFor="showPassword"
              >
                Show Password:
              </label>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              >
              </input>
              {showPassword ? (
                <div>
                  Password: {passwordInfo.passWord}
                </div>
              ) : (
                <div>
                </div>
              )}
            </div>
          ) : (
            <div>

            </div>
          )}
          <button
            onClick={deleteRoomFunction}
          >
            Delete room
          </button>
          
        </div>
      ) : (
        <div>
        </div>
      )}
      
    </div>

  )
}