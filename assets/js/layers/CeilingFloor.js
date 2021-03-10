import Composer from '../composer.js'
import Layer from './Layer.js'

/**
 * @typedef { import('../types').LevelSpec } LevelSpec
 */

const SPIKE_COUNT = 115

class Ceiling extends Layer {
  constructor(ceilingHeight, ceilingVelocity, width, height) {
    super(width, height)
    this.ceilingHeight = ceilingHeight
    this.ceilingVelocity = ceilingVelocity
    this.hasVelocity = ceilingVelocity > 0
    this.spikes = getSpikes(width)
    if (!this.hasVelocity) {
      this.drawCeiling()
    }
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    if (this.hasVelocity) {
      this.context.clearRect(0, 0, this.width, this.height)
      this.drawCeiling()
    }
    super.draw(context)
  }
  update() {
    if (this.hasVelocity) {
      this.ceilingHeight = Math.max(0, this.ceilingHeight + this.ceilingVelocity)
    }
  }
  drawCeiling() {
    // if (this.ceilingHeight > 0) {
    this.context.fillStyle = `hsl(120, 0%, 60%)`
    this.context.fillRect(0, 0, this.width, this.ceilingHeight)
    // }
    this.context.drawImage(this.spikes, 0, Math.max(0, this.ceilingHeight))
  }
}
class Floor extends Layer {
  constructor(floorHeight, width, height) {
    super(width, height)
    this.floorHeight = floorHeight
    this.context.fillStyle = `hsl(120, 0%, 60%)`
    this.context.fillRect(0, this.height - this.floorHeight, this.width, this.height)
  }
}

export default class CeilingFloorLayer extends Layer {
  /**
   * @param {LevelSpec} levelSpec Specs for the level to draw
   * @param {number} width Width of the level
   * @param {number} height Height of the level
   */
  constructor(levelSpec, width, height) {
    super(width, height)
    const { ceilingHeight = 0, ceilingVelocity = 0, floorHeight = 0 } = levelSpec
    this.sublayers = new Composer([
      new Floor(floorHeight, width, height),
      new Ceiling(ceilingHeight, ceilingVelocity, width, height),
    ])
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    this.sublayers.draw(context)
  }
  update() {
    this.sublayers.update()
  }
}
/**
 * @param {number} width Width of the spike strip
 * @returns HTMLCanvasElement
 */
// TODO: 115 spikes
function getSpikes(width) {
  const spikeWidth = width / SPIKE_COUNT
  const spikeHeight = Math.sqrt(spikeWidth ** 2 - (spikeWidth / 2) ** 2)
  const canvas = document.createElement(`canvas`)
  canvas.width = width
  canvas.height = spikeHeight
  const context = canvas.getContext(`2d`)
  context.fillStyle = `hsl(120, 10%, 60%)`
  let x = 0
  for (let i = 0; i < SPIKE_COUNT; ++i) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x + spikeWidth / 2, spikeHeight)
    context.lineTo(x + spikeWidth, 0)
    context.fill()
    x += spikeWidth
  }
  return canvas
}
