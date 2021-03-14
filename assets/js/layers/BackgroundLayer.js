import { getImage } from '../util.js'
import Layer from './Layer.js'

export default class BackgroundLayer extends Layer {
  /**
   * @param {string} imgUrl URL for the background image
   * @param {number} width Width of the level
   * @param {number} height Height of the level
   */
  constructor(imgUrl, width, height) {
    super(width, height)
    // TODO: Error handling maybe?
    getImage(imgUrl).then(async img => {
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    })
  }
}
