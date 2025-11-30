import { useEffect, useState } from "react"

interface CreatureNameProps {
  creatureName: string,
  onUpdate: (newName: string) => void
}

export default function CreatureName({
  creatureName,
  onUpdate
}: CreatureNameProps) {
  const [name, setName] = useState(creatureName)

  useEffect(() => {
    setName(creatureName)
  }, [creatureName])

  function updateName() {
    if (name != creatureName) {
      onUpdate(name)
    }
  }

  const nameString: string = 'Name: '
  return (
    <div className="">
    <label htmlFor="name">
      {nameString}
    </label>
    <input
      className="underline"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={updateName}
    ></input>

    </div>
  )
}