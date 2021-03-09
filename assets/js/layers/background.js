import { getImage } from '../util.js'

/**
 * @typedef { import('../types').Layer } Layer
 */

/**
 * @extends Layer
 */
export default class BackgroundLayer {
  constructor(imgUrl, width, height) {
    this.canvas = document.createElement(`canvas`)
    this.canvas.width = width
    this.canvas.height = height
    this.context = this.canvas.getContext(`2d`)
    // TODO: Error handling maybe?
    getImage(imgUrl).then(img => {
      this.img = img
    })
  }

  /**
   * @param {CanvasRenderingContext2D} context Context on which to draw the background
   */
  draw(context) {
    if (!this.img) return
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.context.drawImage(this.img, 0, 0, this.context.canvas.width, this.context.canvas.height)
    context.drawImage(this.canvas, 0, 0, context.canvas.width, context.canvas.height)
  }
}
