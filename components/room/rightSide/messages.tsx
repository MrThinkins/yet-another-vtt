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

  return (
    <div>
      {messages?.map(({message, userName}, index) => (
        <div key={index}>
          <div>
          {userName}:
          </div>
          {message}
          <br></br>
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
    </div>
  )
}