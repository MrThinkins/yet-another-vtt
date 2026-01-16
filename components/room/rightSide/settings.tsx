import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface settingsProps {
  roomId: string
}

export default function Settings({
  roomId
}: settingsProps) {
  const deleteRoom = useMutation(api.rooms.deleteRoom)
  const router = useRouter()

  function deleteRoomFunction() {
    const confirmRoomDelete = confirm("Are you sure that you want to delete the room?")

    if (confirmRoomDelete) {
      deleteRoom({ roomId: Number(roomId) })
    }
    router.push('./')
  }
  return (
    <div>
      <Link href="../">
        Exit
      </Link>
      <br></br>
      <button
        onClick={deleteRoomFunction}
      >
        Delete room
      </button>
    </div>

  )
}