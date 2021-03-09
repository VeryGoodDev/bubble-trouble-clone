/**
 * @typedef { import('./types').LevelSpec } LevelSpec
 */

import Composer from './composer.js'
import BackgroundLayer from './layers/background.js'
import { getJson } from './util.js'

const BACKGROUND_WIDTH = 1920
const BACKGROUND_HEIGHT = 1080

export default class Level {
  /**
   * @param {LevelSpec} levelSpec Specifications for the level
   */
  constructor(levelSpec) {
    const layers = []
    const backgroundLayer = new BackgroundLayer(levelSpec.backgroundImage, BACKGROUND_WIDTH, BACKGROUND_HEIGHT)
    layers.push(backgroundLayer)
    this.composer = new Composer(layers)
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    this.composer.draw(context)
  }
}
/**
 * @param {string} url URL of the level spec
 * @returns {Promise<LevelSpec>}
 */
export function loadLevel(url) {
  return getJson(url)
}
