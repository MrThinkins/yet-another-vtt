import { yetAnotherTTRPGSkills } from "@/components/yetAnotherTTRPGInfo/arrays"

interface AddSkillProps {
  show: boolean,
  onShowUpdate: (newShow: boolean) => void,
  onUpdate: (skill: object) => void
}

const skills = yetAnotherTTRPGSkills

export default function AddSkill({
  show,
  onShowUpdate,
  onUpdate
}: AddSkillProps){

  function addSkill(index: number) {
    onShowUpdate(false)
    onUpdate(skills[index])
  }
  if (!show) return null
  return (
    <div className="slightHighlight">
      {skills.map(({name, actions, effect}, index) => (
        <div key={index}>
          Name: {name}
          <br></br>
          Actions: {actions}
          <br></br>
          Effect: {effect}
          <br></br>
          <button 
            onClick={() => addSkill(index)}
          >
            Add Skill
          </button>
          {index != skills.length - 1 ? (
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