import { clamp } from '../util.js'
import Layer from './Layer.js'
import { RopeArrow } from './Weapon.js'

/**
 * @typedef { import('./Weapon').Weapon } Weapon
 */

export class Player {
  constructor(levelWidth, levelHeight, minX = 0, maxX = levelWidth) {
    this.width = levelWidth / 17
    this.height = levelHeight / 9
    this.x = levelWidth / 2 - levelWidth / 17
    this.velocity = 0
    this.minX = minX
    this.maxX = maxX - this.width
    /**
     * @type {Weapon}
     */
    this.weapon = new RopeArrow(this.x + this.width / 2, levelHeight)
  }
  /**
   * @param {CanvasRenderingContext2D} context Contex to draw on
   */
  draw(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    this.weapon.draw(context)
    context.fillStyle = `goldenrod`
    context.fillRect(this.x, context.canvas.height - this.height, this.width, this.height)
  }
  update() {
    if (this.velocity) {
      this.x = clamp(this.x + this.velocity, this.minX, this.maxX)
    }
    this.weapon.update()
  }
}

export default class PlayerLayer extends Layer {
  /**
   *
   * @param {Player} player The player instance
   * @param {number} width Width of the level
   * @param {number} height Height of the level
   */
  constructor(player, width, height) {
    super(width, height)
    this.player = player
    this.player.draw(this.context)
  }
  /**
   * @param {CanvasRenderingContext2D} context Contex to draw on
   */
  draw(context) {
    this.player.draw(this.context)
    super.draw(context)
  }
  update() {
    this.player.update()
  }
}
