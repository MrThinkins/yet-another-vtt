interface DisplayStatsProps {
  stats: Array<{
    name: string,
    modifier?: number,
    stat?: number
  }>,
  onUpdate: (index: number, statInfo: number) => void
}

/**
 * Displays the stats for ttrpg
 * @param {Array<{
 *  name: string,
 *  modifier? number,
 *  stat?: number
 * }>} stats, takes the name of the stat, then have a couple of optional values that it shows, and can be updated with the onUpdate pass in
 * @param {() => void} onUpdate, pass in a stat you want to be able to change, for dnd this would be the stat, not the modifier and the modifier is calculated off the stat.
 * @returns a div of html displaying anything along with inputs to change stuff.
 */
export default function DisplayStats({
  stats,
  onUpdate
}: DisplayStatsProps) {
  return (
    <div>
      <label htmlFor="stats">
        <h2 className="center" >
          Stats
        </h2>
      </label>
      <div className="statGrid">
        {stats.map(({name}: {name: string}, index: number) => (
        <div key={index} className="eachStatGrid">
          <div  className="center">
            {name}
          </div>
          <input
            className="number one center"
            id='stats'
            value={stats[index].modifier}
            onChange={(e) => {onUpdate(index, Number(e.target.value))}}
          ></input>
        </div>
      ))}
      </div>

    </div>
    
  )
}