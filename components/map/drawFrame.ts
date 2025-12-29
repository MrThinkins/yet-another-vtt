export default function DrawFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  mapDimensions: { width: number, height: number },
  zoom: number,
  offset: { x: number,  y: number }
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const cellSize = 100
  const row = Math.floor

  ctx.translate(offset.x, offset.y)
  ctx.scale(zoom, zoom)

  for (let row = 0; row < mapDimensions.height; row++) {
    for (let col = 0; col < mapDimensions.width; col++) {
      const hue = ((row * 100 + col * 100) % 360) | 0
      ctx.fillStyle = `hsl(${hue}, 70%, 50%)`
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
    }
  }
}
