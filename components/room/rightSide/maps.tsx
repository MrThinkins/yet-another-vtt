import { useMutation, useQuery } from "convex/react"
import { FormEvent, useRef, useState } from "react"
import { api } from "@/convex/_generated/api"

interface mapsProps {
  roomId: number,
  onSelectMap: (mapId: string) => void
}

export default function Maps({
  roomId,
  onSelectMap
}: mapsProps) {
  const mapList = useQuery(api.maps.getImageList, { roomId: roomId })
  
  const generateUploadUrl = useMutation(api.mapImages.generateUploadUrl)
  const addImageToList = useMutation(api.maps.addImageToList)
  
  const imageInput = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [mapName, setMapName] = useState("Default Name")

  async function uploadImage(event: FormEvent) {
    event.preventDefault()

    const postUrl = await generateUploadUrl()

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    })

    const { storageId } = await result.json()

    await addImageToList({
      roomId: roomId,
      storageId: storageId,
      mapName: mapName
    })

    setSelectedImage(null)
    imageInput.current!.value = ""
  }



  return (
    <div>
      Maps
      <form 
        onSubmit={uploadImage}
      >
        <label
          htmlFor="mapUpload"
        >
          Map Upload
        </label>
        <br></br>
        <label
          htmlFor="mapName"
        >
          Map Name:
        </label>
        <input
          type="text"
          id="mapName"
          value={mapName}
          onChange={(e) => setMapName(e.target.value)}
        >
        </input>
        <br></br>
        <input
          type="file"
          accept="image/*"
          id="mapUpload"
          ref={imageInput}
          onChange={(e) => setSelectedImage(e.target.files![0])}
          disabled={selectedImage != null}
        >
        </input>
        <button
          type="submit"
          disabled={selectedImage == null}
        >
          Upload Map
        </button>
      </form>
      <h2>
        Maps
      </h2>
      {mapList?.map(({ mapName, storageId, _id }, index) => (
        <div 
          onClick={() => onSelectMap(_id)
        }>
          Name: {mapName}
        </div>
      ))}
    </div>
  )
}