const ROPE_ARROW_VELOCITY = 15

export class Weapon {
  /**
   * @param {number} x The X coordinate where the weapon fires from
   */
  constructor(x) {
    this.isFiring = false
    this.x = x
  }
  /**
   * @param {CanvasRenderingContext2D} context Contex to draw on
   */
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  draw(context) {
    throw new Error(`You must define the draw method for a Weapon!`)
  }
  // eslint-disable-next-line class-methods-use-this
  update() {
    throw new Error(`You must define the update method for a Weapon!`)
  }
  fire(x) {
    if (this.isFiring) return
    this.x = x
    this.isFiring = true
  }
}
export class RopeArrow extends Weapon {
  /**
   * @param {number} x The X coordinate where the weapon fires from
   * @param {number} maxHeight The
   */
  constructor(x, maxHeight) {
    super(x)
    this.height = 0
    this.width = 5
    this.maxHeight = maxHeight
    this.shouldPersist = false
  }
  /**
   * @param {CanvasRenderingContext2D} context Contex to draw on
   */
  draw(context) {
    if (!this.isFiring && !this.height) return
    context.fillStyle = this.shouldPersist && this.isMaxHeight() ? `lime` : `crimson`
    context.fillRect(this.x, context.canvas.height - this.height, this.width, this.height)
  }
  update() {
    if (!this.isFiring) return
    if (this.isMaxHeight()) {
      this.isFiring = false
      if (!this.shouldPersist) {
        this.height = 0
      }
    } else {
      this.height += ROPE_ARROW_VELOCITY
    }
  }
  fire(x) {
    if (this.isFiring) return
    super.fire(x)
    if (this.shouldPersist && this.isMaxHeight()) {
      this.height = 0
    }
  }
  isMaxHeight() {
    return this.height >= this.maxHeight
  }
}
