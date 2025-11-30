'use client'

import { useAuth } from "@clerk/clerk-react"
import YetAnotherTTRPG from "@/components/creatures/creatureSheets/yetAnotherTTRPGmainPage"
import { use } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import '../creature.css'
import CreatureName from "@/components/creatures/creatureName"

interface CreatureId {
  params: Promise<{
    creatureId: string,
  }>
}

export default function CreaturePage( { params }: CreatureId ) {
  const param = use(params)
  const { userId } = useAuth()
  const { creatureId } = param
  
  const creature = useQuery(api.creatures.getUserCreature, { userId: String(userId),  _id: creatureId })
  const updateCreature = useMutation(api.creatures.updateUserCreature)
  console.log(creature)

  async function handleUpdateCreature({newName = creature?.creatureName, info = creature?.creatureInfo}) {
    if (
      !creature?._id ||
      !newName ||
      !userId ||
      !info
    ) {
      return
    }
    try {
      await updateCreature({
        _id: creatureId,
        creatureName: newName,
        userId: userId,
        creatureInfo: info
      })
    } catch {
      console.error("Failed to update creature")
    }
    
  }
  
  return (
    <div className="mainPageContainer">
      <div >
        <CreatureName
          creatureName={creature?.creatureName || 'Loading Name'}
          onUpdate={(newName) => handleUpdateCreature({newName: newName})}
        >
      </CreatureName>
      </div>
      
      {/* This is a creature page test test test test test test test test test test test test test test test test test test */}
      {creature?.creatureType == 'yet_another_ttrpg' ? (
        <YetAnotherTTRPG
          creatureInfo={creature.creatureInfo}
          userId={userId || ''}
          onUpdate={(info) => handleUpdateCreature({info: info})}
        >
        </YetAnotherTTRPG>
      ) : (
        <div>

        </div>
      )}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </div>
  )
}