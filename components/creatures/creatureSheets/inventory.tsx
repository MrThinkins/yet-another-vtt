import { useState } from "react"

interface DisplayInventoryProps {
  inventory: Array<{
    name: string,
    weight?: number,
    amount?: number,
  }>,
  onAdd: (item: object) => void,
  onRemove: (index: number) => void,
  onAmountUpdate: (index: number, amount: number) => void,
}

export default function DisplayInventory({
  inventory,
  onAdd,
  onRemove,
  onAmountUpdate,
}: DisplayInventoryProps) {
  const [showAddCustom, setShowAddCustom] = useState(false)

  async function addCustomItem(formData: FormData) {
    const name = formData.get('name')
    const weight = formData.get('weight')
    const amount = formData.get('amount')
    if (name && weight) {
      onAdd({name: name, weight: weight, amount: amount})
    }
    setShowAddCustom(false)
  } 
  
  return (
    <div>
      <h2>
        Inventory
      </h2>
      {inventory.map(({name}: {name: string}, index: number) => (
        <div key={index}>
          <div>
            <b>{name}:</b> {inventory[index].weight} pounds
            {inventory[index].amount ? (
              <div>
                <label htmlFor="amount">
                  Amount: 
                </label>
                <input
                  type="number"
                  id="amount"
                  value={inventory[index].amount}
                  onChange={(e) => {onAmountUpdate(index, Number(e.target.value))}}
                >
                </input>
              </div>
            ) : (
              <div>
              </div>
            )}
            <button onClick={() => onRemove(index)}>
              Remove Item
            </button>
          </div>
          <br></br>
        </div>
      ))}
      {showAddCustom ? (
        <div>
          <hr></hr>
          <label htmlFor="newItem">
            Add Custom Item
          </label>
          <form action={addCustomItem}>
            Name:<input id="newItem" name="name" type="text"></input>
            <br></br>
            Weight:<input id="newItem" name="weight" type="number"></input>
            <br></br>
            Amount:<input id="newItem" name="amount" defaultValue={1} type="number"></input>
            <br></br>
            <button type='submit'>Add Item</button>
            <button onClick={() => setShowAddCustom(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <div>
          <button onClick={() => setShowAddCustom(true)}>Add Custom Item</button>
        </div>
      )}
    </div>
  )
}