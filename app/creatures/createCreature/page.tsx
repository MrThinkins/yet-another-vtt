'use client'

import { useAuth } from "@clerk/clerk-react"
import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
import '../creature.css'

const creatureTypeToSelect = [
  {
    name: 'YetAnotherTTRPG',
    value: 'yet_another_ttrpg'
  }
]

export default function CreateCreature() {
  const [creatureType, setCreatureType] = useState('')
  const [creationPart, setCreationState] = useState('')

  const addCreature = useMutation(api.creatures.addCreature)
  const { userId } = useAuth()
  const router = useRouter()

  function addCreatureFunction(creatureInfo = {}, creatureName = 'new creature') {
    if (userId) {
      addCreature({
        userId: userId,
        creatureType: "yet_another_ttrpg",
        creatureName: creatureName,
        creatureInfo: creatureInfo
      })
    }
    router.push('../creatures')
  }

  function createCreature(type: string) {
    const creationInfo = {
      maxHP: 10,
      currentHP: 10,
      race: 'null',
      speed: 20,
      level: 1,
      physicalDR: 0,
      magicalDR: 0,
      skills: [],
      passiveSkills: [],
      inventory: [
        {
          name: 'backpack',
          weight: 1
        },
        {
          name: 'bread',
          weight: 0.1
        }
      ],
      stats: [
        {
          name: 'physical',
          modifier: 3
        },
        {
          name: 'fortitude',
          modifier: 3
        },
        {
          name: 'intellect',
          modifier: 3
        },
        {
          name: 'charisma',
          modifier: 3
        }
      ]
    }

    if (type == 'tank') {
      creationInfo.maxHP = 11
      creationInfo.currentHP = 11
      creationInfo.race = 'dwarf'
      creationInfo.stats[1].modifier = 4
      creationInfo.physicalDR = 4
      creationInfo.passiveSkills = [
        // @ts-expect-error needed I think
        {
          name: 'Extra Health',
          effect: '+1 hit point per level.'
        },
      ]
      creationInfo.skills = [
        // @ts-expect-error needed I think
        {
          name: 'Melee Attack',
          actions: 1,
          effect: 'Damage: 1d6'
        },
        // @ts-expect-error needed I think
        {
          name: 'Frighten',
          actions: 1,
          effect: 'Make a Strength, Intellect, or Charisma check to scare other creatures of your choice that can hear you. They make an intellect check, on a fail, any damage they do to a creature other than you is halved (rounded down).'
        },
      ]
      addCreatureFunction(creationInfo, type)
    } else if (type == 'fighter') {
      creationInfo.race = 'goliath'
      creationInfo.stats[0].modifier = 4
      creationInfo.physicalDR = 4
      creationInfo.magicalDR = 1
      creationInfo.passiveSkills = [
        // @ts-expect-error needed I think
        {
          name: 'Tough Skin',
          effect: '+1 physical and magical damage resist.'
        },
      ]
      creationInfo.skills = [
        // @ts-expect-error needed I think
        {
          name: 'Melee Attack',
          actions: 1,
          effect: 'Damage: 1d6'
        },
        // @ts-expect-error needed I think
        {
          name: 'Spin Attack',
          actions: 1,
          effect: 'Attack all creatures of your choice within 5 feet of you dealing 1d6 damage.'
        },
      ]
      addCreatureFunction(creationInfo, type)
    } else if (type == 'ranger') {
      creationInfo.race = 'elf'
      creationInfo.speed = 25
      creationInfo.stats[0].modifier = 4
      creationInfo.physicalDR = 1
      creationInfo.magicalDR = 1
      creationInfo.passiveSkills = [
        // @ts-expect-error needed I think
        {
          name: 'Fast Movement',
          effect: 'Move speed is increased by 5 feet.'
        },
      ]
      creationInfo.skills = [
        // @ts-expect-error needed I think
        {
          name: 'Ranged Attack',
          actions: 2,
          effect: 'Damage: 1d6'
        },
        // @ts-expect-error needed I think
        {
          name: 'Piercing Strike',
          actions: 1,
          effect: 'Choose a creature and your next attack against the target creature ignores armor.'
        },
      ]
      addCreatureFunction(creationInfo, type)
    } else if (type = 'rogue') {
      creationInfo.race = 'human'
      creationInfo.stats[3].modifier = 4
      creationInfo.physicalDR = 1
      creationInfo.magicalDR = 1
      creationInfo.passiveSkills = [
        // @ts-expect-error needed I think
        {
          name: 'Friendly',
          effect: 'When making a Charisma check with a creature that is friendly with you, you may  reroll any one’s that you rolled.'
        },
      ]
      creationInfo.skills = [
        // @ts-expect-error needed I think
        {
          name: 'Ranged Attack',
          actions: 2,
          effect: 'Damage: 1d6'
        },
        // @ts-expect-error needed I think
        {
          name: 'Critical Strike',
          actions: 1,
          effect: 'Choose a creature and line up the perfect attack, your next attack against the chosen creature deals twice as much damage.'
        },
      ]
      addCreatureFunction(creationInfo, type)
    }
  }

  return (
    <div className="mainPageContainer">
      Create A creature
      {creatureType == 'yet_another_ttrpg' ? (
        <div>
          {creationPart == '' ? (
            <div>
              <button onClick={() => addCreatureFunction()}>
                Empty Character
              </button>
              <br></br>
              <button onClick={() => setCreationState('quick')}>
                Quick Character Creation
              </button>
            </div>
          ) : creationPart == 'quick' ? (
            <div>
              <h2>
                Fighting Style?
              </h2>
              <button onClick={() => setCreationState('weapons')}>
                Weapons
              </button>
              <button>
                Magic (not implemented)
              </button>
            </div>
          ): creationPart == 'weapons' ? (
            <div>
              <h2>
                Fighting Style?
              </h2>
              <button onClick={() => setCreationState('melee')}>
                Melee
              </button>
              <button onClick={() => setCreationState('ranged')}>
                Ranged
              </button>
            </div>
          ) : creationPart == 'melee' ? (
            <div>
              <h2>
                Melee Fighting Style
              </h2>
              <button onClick={() => createCreature('tank')}>
                Tank
              </button>
              <button onClick={() => createCreature('fighter')}>
                Fighter
              </button>
            </div>
          ) : creationPart == 'ranged' ? (
            <div>
              <h2>
                Ranged Fighting Style
              </h2>
              <button onClick={() => createCreature('ranger')}>
                Ranger
              </button>
              <button onClick={() => createCreature('rogue')}>
                Rogue
              </button>
            </div>
          ) : (
            <div>
              this should not be showing
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3>
            Select the system and type of creature you want to create
          </h3>
          {creatureTypeToSelect.map(({name, value}: {name: string, value: string}, index) => (
            <div key={index}>
              <button onClick={() => setCreatureType(value)}>
                {name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}