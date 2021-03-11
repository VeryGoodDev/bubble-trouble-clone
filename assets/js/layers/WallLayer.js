import Layer from './Layer.js'

/**
 * @typedef { import('../types').WallSpec } WallSpec
 */

const WALL_WIDTH = 1920 / 17

class Wall {
  /**
   * @param {WallSpec} wallSpec Specifications for the wall
   */
  constructor(wallSpec) {
    this.isOpen = false
    this.type = wallSpec.type
    this.width = WALL_WIDTH
    this.position = wallSpec.position
    this.unlockCondition = wallSpec.unlockCondition
  }
  checkUnlockCondition() {}
}

export default class WallLayer extends Layer {
  /**
   * @param {WallSpec[]} walls Array of walls for the level
   * @param {number} width Width of the level
   * @param {number} height Height of the level
   */
  constructor(walls, width, height) {
    super(width, height)
    this.walls = walls.map(wallSpec => new Wall(wallSpec))
  }
}
