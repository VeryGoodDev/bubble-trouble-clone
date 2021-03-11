import { getImage } from '../util.js'
import Layer from './Layer.js'

export default class BackgroundLayer extends Layer {
  constructor(imgUrl, width, height) {
    super(width, height)
    // TODO: Error handling maybe?
    getImage(imgUrl).then(async img => {
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    })
  }
}
