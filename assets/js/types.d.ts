// BubbleSpec type helpers
type Color = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple'
type PositionConstant = 'left' | 'midleft' | 'center' | 'midright' | 'right'
type VelocityConstant = 'left' | 'right' | 'none'
type SplitTypeConstant = 'normal' | 'triple'
type Position = PositionConstant | number
type Velocity = VelocityConstant | number

// LevelSpec type helpers
type GravityConstant = 'normal' | 'low'

// Types for use around the game
export type BubbleSpec = {
  color: Color,
  // TODO: customBehavior
  initialPosition: string | [Position, Position],
  initialVelocity: Velocity,
  size: number,
  splitTrajectories: SplitTypeConstant | Velocity[],
}
export type LevelSpec = {
  backgroundImage: string,
  bubbles: BubbleSpec[],
  ceilingHeight?: number,
  ceilingVelocity?: number,
  floorHeight?: number,
  gravityConstant?: GravityConstant | number,
  levelNumber?: number,
  name: string,
  timeLimit: number,
}
