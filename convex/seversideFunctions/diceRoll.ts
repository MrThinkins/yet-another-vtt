// This is janky, improve it later
export default function rollDice( message: string) {

    let subOrAdd = ''
    let numToSubtract = '0'
    let numToAdd = ''
    let loopCount = 0
    let numberOfDice = ['']
    let diceSize = ['']
    let placeTracker: number = 1
    let diceRolls: Array<number> = []
    if (message.includes("/r")) {

      for (let i = 0; i < message.length; i++) {
        if (placeTracker == 1) {
          if (message[i] == '/') {
            placeTracker++
          }
        } else if (placeTracker == 2) {
          if (message[i] == 'r' && message[i - 1] == '/') {
            placeTracker = 3
          }
        } else if (placeTracker == 3) {
          if (message[i] == 'd') {
            placeTracker = 4
          } else if (Number.isFinite(Number(message[i]))) {
            numberOfDice[loopCount] += message[i]
          }
        } else if (placeTracker == 4) {
          if (Number.isFinite(Number(message[i]))) {
            diceSize[loopCount] += message[i]
          } else if (message[i] == '+' || message[i] == '-') {
            for (let j = i + 1; j <= message.length; j++) {
              if (Number.isFinite(Number(message[j - 1])) && message[j] == "d" && Number.isFinite(Number(message[j + 1]))) {
                console.log('dice roller is broken now')
                placeTracker = 3
                loopCount++
                numberOfDice.push('')
                diceSize.push('')
              }
            }
            if (placeTracker == 4) {
              placeTracker = 5
              if (message[i] == '-') {
                placeTracker = 6
                subOrAdd = 'subtract'
              } else if (message[i] == '+') {
                placeTracker = 6
                subOrAdd = 'add'
              }
            }
          }
        } else if (placeTracker == 5) {
          // if (message[i - 1] == '-') {
          //   placeTracker = 6
          //   subOrAdd = 'subtract'
          // } else if (message[i - 1] == '+') {
          //   placeTracker = 6
          //   subOrAdd = 'add'
          // }
        } else if (placeTracker == 6) {
          if (Number.isFinite(Number(message[i]))) {
            if (subOrAdd == 'subtract') {
              numToSubtract += message[i]
              console.log(message[i])
            } else {
              numToAdd += message[i]
            }
          }
        }
      }
      if (placeTracker >= 4) {
        console.log("numberOfDice: " + numberOfDice)
        console.log("diceSize: " + diceSize)
        let diceRoll = 0
        for (let j = 0; j <= loopCount; j++) {
          for (let i = 0; i < Number(numberOfDice[j]); i++) {
            diceRolls.push(Math.floor(Math.random() * Number(diceSize[j])) + 1)
            diceRoll +=  diceRolls[i]
          }
        }
        
        if (subOrAdd == 'subtract') {
          diceRoll -= Number(numToSubtract)
        } else if (subOrAdd == 'add') {
          diceRoll += Number(numToAdd)
        }

        console.log("diceRoll " + diceRoll )

        return {
          diceRoll: diceRoll,
          diceRolls: diceRolls
        }
        
      }
    }
    return false

}