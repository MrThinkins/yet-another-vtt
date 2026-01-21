export default function parseMessage(message: string) {
  const messageToSend = message
  const sendCommand = checkForCommands(message)

  return {
    messageToSend: messageToSend,
    sendCommand: sendCommand
  }
}

function checkForCommands(message: string) {
  const messageToSend = message.includes("/r")
  return messageToSend
}