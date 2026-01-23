export default function checkMessage(message: string) {
  if (message.length > 10000) {
    message.substring(0, 10000)
  }
  return message
}