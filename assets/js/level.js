/**
 * @typedef { import('./types').LevelSpec } LevelSpec
 */

import Composer from './composer.js'
import { setupKeyboard } from './input.js'
import BackgroundLayer from './layers/BackgroundLayer.js'
import CeilingFloorLayer from './layers/CeilingFloor.js'
import PlayerLayer, { Player } from './layers/PlayerLayer.js'
import WallLayer from './layers/WallLayer.js'
import { getJson } from './util.js'

const SCREEN_WIDTH = 1920
const SCREEN_HEIGHT = 1080

export default class Level {
  /**
   * @param {LevelSpec} levelSpec Specifications for the level
   */
  constructor(levelSpec) {
    const player = new Player(SCREEN_WIDTH, SCREEN_HEIGHT)
    const layers = [
      new BackgroundLayer(levelSpec.backgroundImage, SCREEN_WIDTH, SCREEN_HEIGHT),
      new CeilingFloorLayer(levelSpec, SCREEN_WIDTH, SCREEN_HEIGHT),
      new WallLayer(levelSpec.walls || [], SCREEN_WIDTH, SCREEN_HEIGHT),
      new PlayerLayer(player, SCREEN_WIDTH, SCREEN_HEIGHT),
      // TODO: Bubbles layer
      // TODO: Powerup layer
    ]
    this.composer = new Composer(layers)
    setupKeyboard(player)
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    // context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    this.composer.draw(context)
  }
  update(time) {
    this.composer.update(time)
  }
}
/**
 * @param {string} url URL of the level spec
 * @returns {Promise<LevelSpec>}
 */
export function loadLevel(url) {
  return getJson(url)
}
