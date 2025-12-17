import { useRef, useEffect, useState } from "react"
import DrawFrame from "./drawFrame"
import './map.css'

interface vttMapProps {
  roomId: string,
  userId: string
}

export default function VttMap({
  roomId,
  userId
}: vttMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

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
    // window.addEventListener('resize', updateDimensions)
    // return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const drawFrame = () => {
      DrawFrame(canvas, ctx, dimensions)
      animationRef.current = requestAnimationFrame(drawFrame)
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    animationRef.current = requestAnimationFrame(drawFrame)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions])
  return (
    // <div>
      <div
        ref={divRef}
        className="divRef"
      >
        <canvas
          ref={canvasRef}
          className="canvasRef"
        >
        </canvas>
      </div>
    // </div>
  )
}