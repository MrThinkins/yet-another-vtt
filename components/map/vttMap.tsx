import { useRef, useEffect, useState } from "react"
import DrawFrame from "./drawFrame"

interface vttMapProps {
  roomId: string,
  userId: string
}

export default function VttMap({
  roomId,
  userId
}: vttMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
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
    <div>
      <canvas
        ref={canvasRef}
      >
      </canvas>
      
    </div>
  )
}