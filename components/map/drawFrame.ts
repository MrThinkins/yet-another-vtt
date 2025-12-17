export default function DrawFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dimensions: { width: number, height: number }
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.save()

  ctx.fillStyle = 'blue'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.restore()
}