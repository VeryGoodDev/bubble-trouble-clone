import { positionPresets, splitTypePresets, velocityPresets } from '../constants.js'
import Layer from './Layer.js'

/**
 * @typedef { import('../types').BubbleSpec } BubbleSpec
 * @typedef { import('../types').LevelSpec } LevelSpec
 * @typedef { import('../types').Position } Position
 * @typedef { import('../types').SplitTypeConstant } SplitTypeConstant
 * @typedef { import('../types').Velocity } Velocity
 */

// These functions are the "black box" that encapsulates a lot
// of logic that is done to set up a bubble. Mostly looking up
// values from constants, moved out to these functions to help
// keep the Bubble constructor a bit cleaner
/**
 * @param {[Position, Position]} positionSpec Specifications for the bubble's position
 * @param {number} levelWidth Width of the level
 * @param {number} ballWidth Width of the bubble
 * @returns {[number, number]} [x, y] coordinates of the bubble
 */
function getPosition(positionSpec, levelWidth, bubbleWidth) {
  let [x, y] = positionSpec
  if (typeof x === `string`) {
    x = positionPresets[x](levelWidth, bubbleWidth)
  }
  if (typeof y === `string`) {
    y = positionPresets[y]
  }
  return [x, y]
}
/**
 * @param {Velocity} velocitySpec Specifications for the bubble's velocity
 * @returns {number} The velocity of the bubble along the x axis
 */
function getVelocity(velocitySpec) {
  if (typeof velocitySpec === `string`) {
    return velocityPresets[velocitySpec]
  }
  return velocitySpec
}
/**
 * @param {SplitTypeConstant | Velocity[]} splitTrajectoriesSpec Specifications for the trajectories that should be taken by the bubbles resulting from the bubble being split
 * @returns {number[]} An array of velocities. The length of this determines how many bubbles a bubble becomes when split, and each item determines the velocity for one of those split bubbles
 */
function getSplitTrajectories(splitTrajectoriesSpec) {
  if (typeof splitTrajectoriesSpec === `string`) {
    return splitTypePresets[splitTrajectoriesSpec]
  }
  return splitTrajectoriesSpec.map(trajectory => getVelocity(trajectory))
}
/**
 * @param {number} bubbleSize Size of the bubble (not be confused with its width or radius)
 * @param {number} levelWidth Width of the level
 * @returns {number} The radius for bubble of a given size, based on the width of the level and calculated based on the player size
 */
function getRadius(bubbleSize, levelWidth) {
  // This calculation is literally just me trying a bunch of
  // numbers until I found something that vaguely does what I
  // want it to. After a little experimentation, I guessed that
  // I needed some kind of exponential change for each size to
  // get the right feel for each bubble, so I started playing
  // with numbers in the browser console until I got something
  // that looked mostly like the right amount of change for the
  // first six sizes or so. There is no fancy calculation or
  // clever decisions behind this, just trial and error
  const divisor = (1 / bubbleSize) ** (7 / 18) * 175
  return (levelWidth / divisor) * bubbleSize
}

class Bubble {
  /**
   * @param {BubbleSpec} bubbleSpec Data about the bubble
   * @param {number} index Position of the bubble from the array in the level spec (used as the ID for the bubble)
   * @param {number} levelWidth Width of the level
   */
  constructor(bubbleSpec, index, levelWidth) {
    // TODO: customBehavior
    this.id = index
    this.color = bubbleSpec.color
    this.size = bubbleSpec.size
    this.velocity = getVelocity(bubbleSpec.initialVelocity)
    this.splitTrajectories = getSplitTrajectories(bubbleSpec.splitTrajectories)
    this.radius = getRadius(this.size, levelWidth)
    this.position = getPosition(bubbleSpec.initialPosition, levelWidth, this.radius * 2)
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    const [x, y] = this.position
    context.fillStyle = this.color
    context.beginPath()
    context.arc(x, y, this.radius, 0, 2 * Math.PI)
    context.fill()
  }
  update(levelWidth) {
    const [x, y] = this.position
    if (x - this.radius <= 0 || x + this.radius >= levelWidth) {
      this.velocity = -this.velocity
    }
    this.position = [x + this.velocity, y]
  }
}

export default class BubbleLayer extends Layer {
  /**
   * @param {LevelSpec} levelSpec Specs for the level to draw
   * @param {number} width Width of the level
   * @param {number} height Height of the level
   */
  constructor(levelSpec, width, height) {
    super(width, height)
    this.bubbles = levelSpec.bubbles.map((bubbleSpec, index) => new Bubble(bubbleSpec, index, width))
  }
  /**
   * @param {CanvasRenderingContext2D} context Context to draw on
   */
  draw(context) {
    this.context.clearRect(0, 0, this.width, this.height)
    this.bubbles.forEach(bubble => {
      bubble.draw(this.context)
    })
    super.draw(context)
  }
  update() {
    this.bubbles.forEach(bubble => {
      bubble.update(this.width)
    })
  }
}
