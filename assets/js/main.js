import Level, { loadLevel } from './level.js'

/**
 * @param {HTMLCanvasElement} canvas Canvas on which to draw
 */
async function main(canvas) {
  const context = canvas.getContext(`2d`)
  const levelSpec = await loadLevel(`./assets/levels/1.json`)
  const level = new Level(levelSpec)
  requestAnimationFrame(gameLoop)
  function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    level.update()
    level.draw(context)

    // Last action always needs to request a new animation frame
    requestAnimationFrame(gameLoop)
  }
}
main(document.querySelector(`#screen`))
