import { useRef, useEffect, useState } from "react"
import DrawFrame from "./drawFrame"
import './map.css'

interface vttMapProps {
  roomId: string,
  userId: string
}

const minZoom = 0.1
const maxZoom = 10

export default function VttMap({
  roomId,
  userId
}: vttMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mapDimensions, setMapDimensions] = useState({ width: 10, height: 10 })

  // move and zoom map
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
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

    console.log(zoom)
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

  // update map position on mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current
    
    if (!canvas) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    console.log(zoom)
    DrawFrame(canvas, ctx, mapDimensions, zoom, offset)
  }, [zoom, dimensions, offset])

  return (
      <div
        ref={divRef}
        className="divRef"
      >
        <canvas
          ref={canvasRef}
          className="canvasRef"
          onDoubleClick={doubleClick}
        >
        </canvas>
      </div>
  )
}