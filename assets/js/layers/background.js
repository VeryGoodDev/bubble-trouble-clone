export default class BackgroundLayer {
  constructor(backgroundImg, width, height) {
    this.canvas = document.createElement(`canvas`)
    this.canvas.width = width
    this.canvas.height = height
    this.context = this.canvas.getContext(`2d`)
    this.img = backgroundImg
  }

  /**
   * @param {CanvasRenderingContext2D} context Context on which to draw the background
   */
  draw(context) {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.context.drawImage(this.img, 0, 0, this.context.canvas.width, this.context.canvas.height)
    context.drawImage(this.canvas, 0, 0, context.canvas.width, context.canvas.height)
  }
}
