import Layer from './Layer.js'

/**
 * @typedef { import('../types').WallSpec } WallSpec
 */

const WALL_OPENING_VELOCITY = 40
const WALL_WIDTH = 1920 / 17

class Wall {
  /**
   * @param {WallSpec} wallSpec Specifications for the wall
   */
  constructor(wallSpec) {
    // Separate properties for open and unlocked, because once
    // unlocked, it will be in the process of opening for a few
    // frames, so we need to know the difference
    this.isOpen = false
    this.isUnlocked = false
    this.width = WALL_WIDTH
    this.position = wallSpec.position
    this.unlockCondition = wallSpec.unlockCondition
    if (this.unlockCondition.type === `time`) {
      this.timeUntilUnlock = this.unlockCondition.time
    }
  }
  checkUnlockCondition(time) {
    if (this.unlockCondition.type === `time`) {
      if (time >= this.unlockCondition.time) {
        this.isUnlocked = true
      }
    } else if (this.unlockCondition.type === `bubble`) {
      // TODO:
    }
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  // eslint-disable-next-line no-unused-vars, class-methods-use-this -- Disabled because this is intended to be extended and overriden
  draw(context) {}
  // eslint-disable-next-line class-methods-use-this -- Disabled because this is intended to be extended and overriden
  update() {}
}
class RemovableWall extends Wall {
  /**
   * @param {WallSpec} wallSpec Specifications for the wall
   * @param {number} wallHeight Total height of the wall
   */
  constructor(wallSpec, wallHeight) {
    super(wallSpec)
    this.sectionHeight = wallHeight / 2
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    if (this.isOpen) return
    context.fillStyle = `orange`
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    // Draw top
    this.drawWallSection(context, 0)
    // Draw bottom
    this.drawWallSection(context, context.canvas.height - this.sectionHeight)
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  drawWallSection(context, startY) {
    context.fillRect(this.position, startY, this.width, this.sectionHeight)
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  update(time) {
    if (this.isOpen) return
    if (this.isUnlocked) {
      if (this.sectionHeight < 0) this.isOpen = true
      this.sectionHeight -= WALL_OPENING_VELOCITY
    } else {
      this.checkUnlockCondition(time)
    }
  }
}
class WithDoorWall extends Wall {}

export default class WallLayer extends Layer {
  /**
   * @param {WallSpec[]} walls Array of walls for the level
   * @param {number} width Width of the level
   * @param {number} height Height of the level
   */
  constructor(walls, width, height) {
    super(width, height)
    this.walls = walls.map(wallSpec => {
      if (wallSpec.type === `removable`) {
        return new RemovableWall(wallSpec)
      }
      if (wallSpec.type === `withdoor`) {
        return new WithDoorWall(wallSpec)
      }
      console.error(`Invalid wall type [${wallSpec.type}] provided`)
      return ``
    })
    // FIXME: Testing code, remove
    if (!this.walls.length) {
      this.walls.push(
        new RemovableWall(
          {
            position: width / 10,
            unlockCondition: {
              type: `time`,
              time: 5e3,
            },
          },
          height
        )
      )
    }
    if (this.walls.length) {
      this.walls.forEach(wall => {
        wall.draw(this.context)
      })
    }
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    this.walls.forEach(wall => {
      if (wall.isOpen) return
      if (wall.isUnlocked) {
        wall.draw(this.context)
      }
    })
    super.draw(context)
  }
  update(time) {
    this.walls.forEach(wall => {
      wall.update(time)
    })
  }
}
