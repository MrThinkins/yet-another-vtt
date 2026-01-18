import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import TextareaAutosize from 'react-textarea-autosize'
import { useState, FormEvent, KeyboardEvent } from "react"

interface messagesProps {
  roomId: string
}

export default function Messages({
  roomId,
}: messagesProps) {
  const messages = useQuery(api.messages.getMessage, { roomId: Number(roomId) })
  const deleteMessage = useMutation(api.messages.deleteMessage)
  const [messageInput, setMessageInput] = useState<string> ('')
  console.log(messages)

  const send = useMutation(api.messages.sendMessage)

  async function submitMessage(e: FormEvent) {
    e.preventDefault()
    sendMessage(messageInput, Date.now())
    setMessageInput('')
  }

  async function sendMessage(message: string, timeSent: number) {
    await send({
      roomId: Number(roomId),
      message,
      timeSent
    })
  }

  async function onKeyDown(e: KeyboardEvent) {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault()
      submitMessage(e)
    }
  }

  async function deleteMessageFunction(index: number) {
    deleteMessage({ roomId: Number(roomId), index: index })
    console.log("deleteMessage function called for " + index)
  }

  return (
    <div>
      {messages?.map(({message, userName}, index) => (
        <div key={index}>
          <div>
          {userName}:
          </div>
          {message}
          <br></br>
          <div
            className="showOnHover material-symbols-outlined"
            onClick={() => deleteMessageFunction(index)}
          >
            delete
          </div>
        </div>
      ))}
      
      <form onSubmit={submitMessage} >
        <TextareaAutosize
          onKeyDown={onKeyDown}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        >
        </TextareaAutosize>
        <button type="submit">Send Message</button>
      </form>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </div>
  )
}