import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import TextareaAutosize from 'react-textarea-autosize'
import { useState, FormEvent, KeyboardEvent } from "react"
import './messages.css'
import parseMessage from "./sendMessage"

interface messagesProps {
  roomId: number
}

export default function Messages({
  roomId,
}: messagesProps) {
  const messages = useQuery(api.messages.getMessage, { roomId: roomId })
  const deleteMessage = useMutation(api.messages.deleteMessage)
  const checkAndSendCommand = useMutation(api.messages.checkAndSendCommand)
  const [messageInput, setMessageInput] = useState<string> ('')

  const send = useMutation(api.messages.sendMessage)

  async function submitMessage(e: FormEvent) {
    e.preventDefault()
    sendMessage(messageInput, Date.now())
    setMessageInput('')
  }

  async function sendMessage(message: string, timeSent: number) {
    console.log(message)
    const messageToSendObject = parseMessage(message)
    console.log(messageToSendObject)
    await send({
      roomId: roomId,
      message: messageToSendObject.messageToSend,
      timeSent
    })
    if (messageToSendObject.sendCommand) {
      checkAndSendCommand({ 
        message: messageToSendObject.messageToSend,
        roomId: roomId,
        timeSent: timeSent
       })
    }
  }

  async function onKeyDown(e: KeyboardEvent) {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault()
      submitMessage(e)
    }
  }

  async function deleteMessageFunction(index: number) {
    deleteMessage({ roomId: roomId, index: index })
    console.log("deleteMessage function called for " + index)
  }

  return (
    <div
      className="messagesContainer"
    >
      <div
        className="messagesList "
      >
        {messages?.map(({message, userName}, index) => (
        <div key={index} className="messageList showOnHover textPadding preWrap">
          <div
            className="userName"
          >  
            {userName}:
          </div>
          {message}
          <br></br>
          <div
            className="showOnHoverObject cursorPointer messageDeleteButton material-symbols-outlined"
            onClick={() => deleteMessageFunction(index)}
          >
            delete
          </div>
        </div>
        ))}
      </div>

      <form onSubmit={submitMessage} >
        <TextareaAutosize
          onKeyDown={onKeyDown}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="textareaAuto"
        >
        </TextareaAutosize>
        <button type="submit">Send Message</button>
      </form>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </div>
  )
}