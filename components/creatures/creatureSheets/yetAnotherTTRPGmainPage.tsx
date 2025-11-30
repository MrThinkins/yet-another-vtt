import './yetAnother.css' 
import { useEffect, useState } from "react"
import AddSkill from "./addSkill"
import AddPassiveSkill from "./addPassiveSkill"
import DisplayStats from "./displayStats"
import DisplayInventory from "./inventory"

interface YetAnotherTTRPGProps {
  creatureInfo: any,  // eslint-disable-line @typescript-eslint/no-explicit-any
  userId: string,
  onUpdate: (info: object) => void
}

const starterInfo = {
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

export default function YetAnotherTTRPG({
  creatureInfo,
  userId,
  onUpdate
}: YetAnotherTTRPGProps) {
  
  const [info, setInfo] = useState(() => {
    return creatureInfo && Object.keys(creatureInfo).length > 0 ? creatureInfo : starterInfo
  })
  const [showAddSkill, setShowAddSkill] = useState(false)
  const [showAddPassiveSkill, setShowAddPassiveSkill] = useState(false)

  const [partToShow, setPartToShow] = useState('abilities')

  function useUserId() {
    if (userId) {
      return
    }
    return
    //this is just to fix userId error, probably should be removed, but it might be needed in future.
  }
  useUserId()
  console.log(info)
  useEffect(() => {
    if (creatureInfo && Object.keys(creatureInfo).length > 0 && creatureInfo != info) {
      setInfo(creatureInfo)
    }
  }, [creatureInfo])

  useEffect(() => {
    if(creatureInfo != info) {
      updateCreatureInfo()
    }
  }, [info])

  function updateCreatureInfo() {
    if (info != creatureInfo) {
      if (info == null || Object.keys(info).length == 0) {
        onUpdate(starterInfo)
      } else {
        onUpdate(info)
      }
    }
  }

  function addSkill(skill: object) {
    setInfo((prev: {skills: any}) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ...prev,
      skills: [...prev.skills,  skill]
    }))
  }

  function addItem(item: object) {
    setInfo((prev: {inventory: any}) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ...prev,
      inventory: [...prev.inventory, item]
    }))
  }

  function itemAmountUpdate(index: number, amount: number) {
    setInfo((prev: {inventory: any}) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ...prev,
      inventory: prev.inventory.map((item: object, i: number) => 
        i == index ? { ...item, amount: amount } : item
      )
    }))
  }

  function removeItem(index: number) {
    setInfo((prev: {inventory: any[]}) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ...prev,
      inventory: [
        ...prev.inventory.slice(0, index),
        ...prev.inventory.slice(index + 1)
      ]
    }))
  }

  function addPassiveSkill(passiveSkill: object) {
    setInfo((prev: {passiveSkills: any}) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ...prev,
      passiveSkills: [...prev.passiveSkills, passiveSkill]
    }))
  }

  function setStatInfo(index: number, statInfo: number) {
    console.log (`
      index: ${index},
      statInfo: ${statInfo}  
    `)
    
    setInfo((prev: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const updatedStats = [...prev.stats]
      updatedStats[index] = {
        name: prev.stats[index].name,
        modifier: statInfo
      }
    
      return {
        ...prev, // eslint-disable-line @typescript-eslint/no-explicit-any
        stats: updatedStats // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    })
  }

  return (
    <div className="mainGrid">
      Yet another ttrpg
      <div className="HPNameLevel">
        <div>
          <label htmlFor="hp">
            Hit Points:
          </label>
          <input
            className="number"
            id="hp"
            value={info.maxHP}
            onChange={(e) => 
              setInfo((prev: object) => ({
                ...prev,
                maxHP: Number(e.target.value),
              }))
            }
          >
          </input>
          /
          <input
            className="number"
            id="hp"
            value={info.currentHP}
            onChange={(e) => 
              setInfo((prev: object) => ({
                ...prev,
                currentHP: Number(e.target.value),
              }))
            }
          >
          </input>
        </div>
        <div>
          <label htmlFor="race">
            Race:
          </label>
          <input 
            className="gridText"
            id="race"
            value={info.race}
            onChange={(e) => 
              setInfo((prev: object) => ({
                ...prev,
                race: e.target.value
              }))
            }
          >
          </input>
        </div>
        <div>
          <label htmlFor="speed">
            Speed:  
          </label>
          <input
            className="gridText"
            id="speed"
            value={info.speed}
            onChange={(e) =>
              setInfo((prev: object) => ({
                ...prev,
                speed: e.target.value
              }))
            }
          >
          </input>
        </div>
        <div>
          Level:
          <input
            className="number"
            id="hp"
            value={info.level}
            onChange={(e) => 
              setInfo((prev: object) => ({
                ...prev,
                level: Number(e.target.value),
              }))
            }
          >
          </input>
        </div>
      </div>
      <div className="damageReductionGrid">
        <div>
          Damage Reduction
        </div>
        <div>
          <label
            htmlFor="physical"
          >
            Physical: 
          </label>
          <input 
            className="number"
            id="physical"
            value={info.physicalDR}
            onChange={(e) =>
              setInfo((prev: object) => ({
                ...prev,
                physicalDR: Number(e.target.value)
              }))
            }
          ></input>
        </div>
        <div>
          <label
            htmlFor="magical"
          >
            Magical: 
          </label>
          <input 
            className="number"
            id="magical"
            value={info.magicalDR}
            onChange={(e) =>
              setInfo((prev: object) => ({
                ...prev,
                magicalDR: Number(e.target.value)
              }))
            }
          ></input>
        </div>
      </div>
      <div className="partGrid">
        <button onClick={() => setPartToShow('abilities')} className="">
          Stats
        </button>
        <button onClick={() => setPartToShow('skills')} className="">
          Skills
        </button>
        <button onClick={() => setPartToShow('passiveSkills')} className="">
          Passives
        </button>
        <button onClick={() => setPartToShow('inventory')} className="">
          Inventory
        </button>
      </div>
      {partToShow == 'abilities' ? (
        <div>
          <DisplayStats
            stats={info.stats}
            onUpdate={(index, statInfo) => {setStatInfo(index, statInfo)}}
          ></DisplayStats>
        </div>
      ) : partToShow == 'skills' ? (
        <div>
          <h2>
            Skills
          </h2>
          <div>
          {info.skills.map(({name, actions, effect}: {name: string, actions: number, effect: string}, index: number) => (
          <div key={index}>
            Skill: {name}
            <div>
              Actions: {actions}
            </div>
            <div>
              Effect: {effect}
            </div>
            {index != info.skills.length - 1 ? (
              <div>
                <br></br>
              </div>
            ) : (
              <div>
              </div>
            )}
          </div>
          ))}
          </div>
          <br></br>
          <AddSkill
            show={showAddSkill}
            onShowUpdate={(e) => setShowAddSkill(e)}
            onUpdate={(skill) => addSkill(skill)}
          ></AddSkill>
          {!showAddSkill? (
          <button
            onClick={() => setShowAddSkill(true)}
          >
            addSkill
          </button>
          ) : (
            <div>
            </div>
          )}
        </div> 
      ) : partToShow == 'passiveSkills' ? (
        <div>
          <h2>
            Passive Skills
          </h2>
          {info.passiveSkills.map(({name, effect}: {name: string, effect: string}, index: number) => (
            <div key={index}>
              Skill: {name}
              <div>
                Effect: {effect}
              </div>
              {index != info.passiveSkills.length - 1 ? (
                <div>
                  <br></br>
                </div>
              ) : (
                <div>

                </div>
              )}
            </div>
          ))}
          <br></br>
          <AddPassiveSkill
            show={showAddPassiveSkill}
            onShowUpdate={(e) => setShowAddPassiveSkill(e)}
            onUpdate={(skill) => addPassiveSkill(skill)}
          ></AddPassiveSkill>
          
          {!showAddPassiveSkill ? (
            <button
            onClick={() => setShowAddPassiveSkill(true)}
          >
            addPassiveSkill
          </button>
          ) : (
            <div>
            </div>
          )}
        </div>
      ) : partToShow == 'inventory' ?  (
        <div>
          <DisplayInventory
            inventory={info.inventory}
            onAdd={(item) => addItem(item)}
            onRemove={(index) => removeItem(index)}
            onAmountUpdate={(index, amount) => itemAmountUpdate(index, amount)}
          ></DisplayInventory>
        </div>
      ) : (
        <div>

        </div>
      )}
      <button
        onClick={updateCreatureInfo}
      >
        update
      </button>
    </div>
  )
}