export default function trimMessages(messages: Array<any>) {
  let currentMessage = messages

  if (currentMessage.length >= 5000) {
    currentMessage = currentMessage.slice(5)
  }

  return currentMessage
}