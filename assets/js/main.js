import BackgroundLayer from './layers/background.js'

/**
 * @param {HTMLCanvasElement} canvas Canvas on which to draw
 */
async function main(canvas) {
  const context = canvas.getContext(`2d`)
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function onLoadImage() {
      resolve(img)
    }
    img.onerror = function onError() {
      reject(new Error(`Something went wrong loading the image`))
    }
    img.src = `/assets/img/backgrounds/levels/1.jpg`
  })
  const backgroundLayer = new BackgroundLayer(image, canvas.width, canvas.height)
  requestAnimationFrame(gameLoop)
  function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    backgroundLayer.draw(context)
    context.fillStyle = `red`
    context.beginPath()
    context.arc(canvas.width / 10, (canvas.height / 10) * 4, canvas.width / 20, 0, 2 * Math.PI)
    context.fill()
    context.fillStyle = `green`
    context.fillRect((canvas.width / 10) * 4, (canvas.height / 10) * 7, canvas.width / 10, (canvas.height / 10) * 2)

    // Last action always needs to request a new animation frame
    requestAnimationFrame(gameLoop)
  }
}
main(document.querySelector(`#screen`))
