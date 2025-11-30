
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useAuth } from "@clerk/clerk-react"
import Link from "next/link"

export default function ListCreatures() {
  const { userId } = useAuth()
  const creatures = useQuery(api.creatures.getUserCreatureList, { userId: userId || '' })
  const deleteCreature = useMutation(api.creatures.deleteUserCreature)

  console.log(creatures)

  return (
    <div>
      {creatures?.map(({ creatureName, creatureType, _id }, index) => (
        <div key={index} className="nameList showOnHover">
          <Link href={`/creatures/${_id}`} className="nameListItem">
            Name: {creatureName}
            <br></br>
            Creature Type: {creatureType}
          </Link>
          <br></br>
          <button 
            className="showOnHoverObject"
            onClick={() => deleteCreature({userId: userId || "", _id: _id})}
          >
            delete creature
          </button>
        </div>
      ))} 
    </div>
  )
}