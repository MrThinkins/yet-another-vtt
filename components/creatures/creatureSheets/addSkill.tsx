interface AddSkillProps {
  show: boolean,
  onShowUpdate: (newShow: boolean) => void,
  onUpdate: (skill: object) => void
}

const skills = [
  {
    name: 'Melee Attack',
    actions: 1,
    effect: 'Damage: 1d6'
  }, 
  {
    name: 'Ranged Attack',
    actions: 2,
    effect: 'Damage: 1d6'
  },
  {
    name: 'Coat With Fast Acting Poison',
    actions: 1,
    effect: 'coat target weapon or projectile with poison, next attack made with it in the next minute deals an extra 1d6 damage.'
  },
  {
    name: 'Coat With Healing Mitigation Poison',
    actions: 1,
    effect: 'Coat the weapon or projectile in a poison, the next attack made with it in the next minute makes it so that the person hit by it can not heal or be healed for one day.'
  },
  {
    name: 'Coat With Slow Acting Poison',
    actions: 1,
    effect: 'Coat target weapon or projectile with poison, next attack made with it in the next minute makes the target take 1d6 damage at the end of every hour for 8 hours.'
  },
  {
    name: 'Piercing Strike',
    actions: 1,
    effect: 'Choose a creature and your next attack against the target creature ignores armor.'
  },
  {
    name: 'Critical Strike',
    actions: 1,
    effect: 'Choose a creature and line up the perfect attack, your next attack against the chosen creature deals twice as much damage.'
  },
  {
    name: 'Taunt',
    actions: 1,
    effect: 'Make a Charisma or Intellect check against a target creature\'s Intellect check, if the other creature fails, they can only attack you next turn.'
  },
  {
    name: 'Frighten',
    actions: 1,
    effect: 'Make a Strength, Intellect, or Charisma check to scare other creatures of your choice that can hear you. They make an intellect check, on a fail, any damage they do to a creature other than you is halved (rounded down).'
  },
  {
    name: 'Grapple',
    actions: 1,
    effect: 'Make a Strength check vs target Strength check. If you win, the target is grappled and can no longer move or take actions, except to try to escape. While you have someone grappled you can drag them with you wherever you move. To escape they can use an action to make a Strength check vs you.'
  },
  {
    name: 'Spin Attack',
    actions: 1,
    effect: 'Attack all creatures of your choice within 5 feet of you dealing 1d6 damage.'
  },
]

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