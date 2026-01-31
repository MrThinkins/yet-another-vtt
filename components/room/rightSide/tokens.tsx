import { api } from "@/convex/_generated/api"
import { generateUploadUrl } from "@/convex/images"
import { useMutation } from "convex/react"
import { FormEvent } from "react"
import { useRef, useState } from "react"

interface tokenProps {
  roomId: number
}

export default function Tokens({
  roomId
}: tokenProps) {

  const generateUploadUrl = useMutation(api.images.generateUploadUrl)

  const addTokenToList = useMutation(api.tokens.addTokenToList)

  const imageInput = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [tokenName, setTokenName] = useState("Default Name")

  async function uploadToken(event: FormEvent) {
    event.preventDefault()

    const postUrl = await generateUploadUrl()

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage
    })

    const { storageId } = await result.json()

    await addTokenToList({
      roomId: roomId,
      storageId: storageId,
      tokenName: tokenName
    })

    setSelectedImage(null)
    imageInput.current!.value = ""
  }
  
  return (
    <div>
      <h3>
        Tokens
      </h3>
      <form
        onSubmit={uploadToken}
      >
        <label
          htmlFor="tokenUpload"
        >
          Token Upload
        </label>
        <br></br>
        <label
          htmlFor="tokenName"
        >
          Token Name:
        </label>
        <input
          type="text"
          id="tokenName"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        ></input>
        <br></br>
        <input
          type="file"
          accept="image/*"
          id="tokenUpload"
          ref={imageInput}
          onChange={(e) => setSelectedImage(e.target.files![0])}
          disabled={selectedImage != null}
        ></input>
        <button
          type="submit"
          disabled={selectedImage == null}
        >
          Upload Token
        </button>
      </form>
    </div>
  )
}