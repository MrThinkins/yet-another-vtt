import { useRef, useEffect, useState } from "react"
import DrawFrame from "./drawFrame"
import './map.css'
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

interface vttMapProps {
  roomId: number,
  mapId: string
}

const minZoom = 0.1
const maxZoom = 10

const defaultMapStorageId = {
  _creationTime: 1769374760668.4604,
  _id: "kg22bd2ap10p5r9a4xh6hxkzqx7zx4wk",
  contentType: "image/jpeg",
  sha256: "w++QdVr3RfzC6ZwNbvEJDP5GcP2gLeOIqsjhaYaCPQY=",
  size: 115857,
}

export default function VttMap({
  roomId, // eslint-disable-line
  // mapId
}: vttMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mapDimensions] = useState({ width: 10, height: 10 })

  const roomStorageId = useQuery(api.rooms.getStorageId, { roomId: roomId })
  console.log("roomStorageId " + roomStorageId)

  const [image, setImage] = useState<HTMLImageElement | null>(null)

  const [mapStorageId, setMapStorageId] = useState<Id<"_storage">>(
    defaultMapStorageId._id as Id<"_storage">
  )

  const mapImage = useQuery(api.maps.getImage, { 
    storageId: mapStorageId
  })

  useEffect(() => {
    if (!mapImage) {
      return
    }


    const img = new Image()
    img.onload = () => {
      setImage(img)
    }

    img.src = mapImage

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [mapImage])


  useEffect(() => {
    console.log('changing map storage Id')
    // if (!mapInfo) {
    //   return
    // }
    // if (!mapInfo.storageId) {
    //   return
    // }
    if (!roomStorageId) {
      return
    }

    setMapStorageId(
      roomStorageId
    )

    console.log("mapStorageId " + mapStorageId)

    
  }, [roomStorageId])
  

  // move and zoom map
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  // dimensions updating
  useEffect(() => {
    const div = divRef.current
    if (!div) return

    const updateDimensions = () => {
      setDimensions({
        width: div.clientWidth,
        height: div.clientHeight
      })
    }
    updateDimensions()
    
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(div)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const handleWheelZoom = (e: WheelEvent) => {
    e.preventDefault()

    const canvas = canvasRef.current

    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.max(minZoom, Math.min(zoom * zoomFactor, maxZoom))

    const zoomRatio = newZoom / zoom
    const newOffsetX = mouseX - zoomRatio * (mouseX - offset.x)
    const newOffsetY = mouseY - zoomRatio * (mouseY - offset.y)

    setZoom(newZoom)
    setOffset({ x: newOffsetX, y: newOffsetY })
  }

  // wheel zoom handling
  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    canvas.addEventListener('wheel', handleWheelZoom, { passive: false })

    return () => {
      canvas.removeEventListener('wheel', handleWheelZoom)
    }
  })

  // double click to reset zoom
  const doubleClick = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  // drag to move
  const mouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    })
  }
  
  const mouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => { // eslint-disable-line
    setIsDragging(false)
  }

  const mouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  // update map position on mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current
    
    if (!canvas) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    console.log(zoom)
    if (!mapImage) {
      return
    }

    if (!image) {
      return
    }
    console.log(mapImage)
    DrawFrame(canvas, ctx, mapDimensions, zoom, offset, image)
  }, [zoom, dimensions, offset, mapImage, image])

  return (
      <div
        ref={divRef}
        className="divRef"
      >
        <canvas
          ref={canvasRef}
          className="canvasRef"
          onDoubleClick={doubleClick}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
        >
        </canvas>
      </div>
  )
}