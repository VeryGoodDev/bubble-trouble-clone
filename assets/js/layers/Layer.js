export default class Layer {
  constructor(width, height) {
    this.canvas = document.createElement(`canvas`)
    this.canvas.width = width
    this.canvas.height = height
    this.context = this.canvas.getContext(`2d`)
    this.width = width
    this.height = height
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    context.drawImage(this.canvas, 0, 0)
  }
  // eslint-disable-next-line class-methods-use-this -- Disabled because this is intended to be empty unless overridden
  update() {}
}
