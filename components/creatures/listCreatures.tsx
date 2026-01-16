
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"

export default function ListCreatures() {
  const creatures = useQuery(api.creatures.getUserCreatureList)
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
            onClick={() => deleteCreature({ _id: _id})}
          >
            delete creature
          </button>
        </div>
      ))} 
    </div>
  )
}