/**
 * @typedef { import('./types').BubbleColor } BubbleColor
 * @typedef { import('./types').PositionConstant } PositionConstant
 * @typedef { import('./types').PositionFunction } PositionFunction
 * @typedef { import('./types').VelocityConstant } VelocityConstant
 * @typedef { import('./types').SplitTypeConstant } SplitTypeConstant
 * @typedef { import('./types').GravityConstant } GravityConstant
 */

const POSITION_EDGE_OFFSET = 40
const VELOCITY_CONSTANT = 4.25
const GRAVITY_CONSTANT = 10

/**
 * @type Record<BubbleColor, string>
 */
export const bubbleColors = {
  RED: `red`,
  ORANGE: `orange`,
  YELLOW: `yellow`,
  GREEN: `green`,
  BLUE: `blue`,
  PURPLE: `rebeccapurple`,
}
/**
 * @type Record<PositionConstant, PositionFunction>
 */
export const positionPresets = {
  /**
   * Offset slightly from the left edge of the screen
   * @returns {number}
   */
  LEFT: () => 40,
  /**
   * Centered between the center and left edge of the screen
   * @param {number} levelWidth Width of the level
   * @param {number} bubbleWidth Width of the ball
   * @returns {number}
   */
  MIDLEFT: (levelWidth, bubbleWidth) => levelWidth / 4 - bubbleWidth / 2,
  /**
   * Centered on the screen
   * @param {number} levelWidth Width of the level
   * @param {number} bubbleWidth Width of the ball
   * @returns {number}
   */
  CENTER: (levelWidth, bubbleWidth) => levelWidth / 2 - bubbleWidth / 2,
  /**
   * Centered between the center and right edge of the screen
   * @param {number} levelWidth Width of the level
   * @param {number} bubbleWidth Width of the ball
   * @returns {number}
   */
  MIDRIGHT: (levelWidth, bubbleWidth) => levelWidth * 0.75 - bubbleWidth / 2,
  /**
   * Offset slightly from the right edge of the screen
   * @param {number} levelWidth Width of the level
   * @param {number} bubbleWidth Width of the ball
   * @returns {number}
   */
  RIGHT: (levelWidth, bubbleWidth) => levelWidth - bubbleWidth - POSITION_EDGE_OFFSET,
}
/**
 * @type Record<VelocityConstant, number>
 */
export const velocityPresets = {
  LEFT: -VELOCITY_CONSTANT,
  RIGHT: VELOCITY_CONSTANT,
  NONE: 0,
}
/**
 * @type Record<SplitTypeConstant, number[]>
 */
export const splitTypePresets = {
  NORMAL: [velocityPresets.LEFT, velocityPresets.RIGHT],
  TRIPLE: [velocityPresets.LEFT, velocityPresets.RIGHT, velocityPresets.NONE],
}
/**
 * @type Record<GravityConstant, number>
 */
export const gravityPresets = {
  NORMAL: GRAVITY_CONSTANT,
  LOW: GRAVITY_CONSTANT / 2,
}
