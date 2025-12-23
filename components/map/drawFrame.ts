export default function DrawFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dimensions: { width: number, height: number },
  zoom: number
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const cellSize = 100
  
  ctx.scale(zoom, zoom)

  for (let row = 0; row < dimensions.height; row++) {
    for (let col = 0; col < dimensions.width; col++) {
      const hue = ((row * 100 + col * 100) % 360) | 0
      ctx.fillStyle = `hsl(${hue}, 70%, 50%)`
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
    }
  }
}
