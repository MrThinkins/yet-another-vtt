export default function parseMessage(message: string) {
  // let messageToSend= message.replaceAll('\n', '<br></br>')
  let messageToSend = message
  let sendCommand = checkForCommands(message)

  return {
    messageToSend: messageToSend,
    sendCommand: sendCommand
  }
}

function checkForCommands(message: string) {
  let messageToSend = message.includes("/r")
  return messageToSend
}