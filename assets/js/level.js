/**
 * @typedef { import('./types').LevelSpec } LevelSpec
 */

import Composer from './composer.js'
import BackgroundLayer from './layers/BackgroundLayer.js'
import CeilingFloorLayer from './layers/CeilingFloor.js'
import { getJson } from './util.js'

const SCREEN_WIDTH = 1920
const SCREEN_HEIGHT = 1080

export default class Level {
  /**
   * @param {LevelSpec} levelSpec Specifications for the level
   */
  constructor(levelSpec) {
    const layers = [
      new BackgroundLayer(levelSpec.backgroundImage, SCREEN_WIDTH, SCREEN_HEIGHT),
      new CeilingFloorLayer(levelSpec, SCREEN_WIDTH, SCREEN_HEIGHT),
      // TODO: Wall layer
      // TODO: Players layer
      // TODO: Bubbles layer
      // TODO: Powerup layer
    ]
    this.composer = new Composer(layers)
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    // context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    this.composer.draw(context)
  }
  update() {
    this.composer.update()
  }
}
/**
 * @param {string} url URL of the level spec
 * @returns {Promise<LevelSpec>}
 */
export function loadLevel(url) {
  return getJson(url)
}
