/**
 * @typedef { import('./layers/Layer').default } Layer
 */

export default class Composer {
  /**
   * @param {Layer[]} layers The layers to draw
   */
  constructor(layers) {
    this.layers = layers
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    this.layers.forEach(layer => {
      layer.draw(context)
    })
  }
  update() {
    this.layers.forEach(layer => {
      layer.update?.()
    })
  }
}
