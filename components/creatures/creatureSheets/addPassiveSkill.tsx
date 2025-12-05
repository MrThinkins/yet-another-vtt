import { yetAnotherTTRPGPassiveSkills } from "@/components/yetAnotherTTRPGInfo/arrays"

interface addPassiveSkillProps {
  show: boolean,
  onShowUpdate: (newShow: boolean) => void,
  onUpdate: (skill: object) => void
}

const passiveSkills = yetAnotherTTRPGPassiveSkills

export default function AddPassiveSkill({
  show,
  onShowUpdate,
  onUpdate
}: addPassiveSkillProps) {
  function addPassiveSkill(index: number) {
    onShowUpdate(false)
    console.log('addPassiveSkill')
    console.log(passiveSkills[index])
    onUpdate(passiveSkills[index])
  }
  if (!show) return null
  return (
    <div className="slightHighlight">
      {passiveSkills.map(({name, effect}, index) => (
        <div key={index}>
          Name: {name}
          <br></br>
          Effect: {effect}
          <br></br>
          <button
            onClick={() => addPassiveSkill(index)}
          >
            Add Passive Skill
          </button>
          {index != passiveSkills.length - 1 ? (
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
      <button
        onClick={() => onShowUpdate(false)}
      >
        Cancel
      </button>
    </div>
  )
}