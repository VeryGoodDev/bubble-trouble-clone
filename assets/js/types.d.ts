// BubbleSpec type helpers
type BubbleColor = `red` | `orange` | `yellow` | `green` | `blue` | `purple`
// TODO: Eventually define a pattern if possible?
type BubbleId = string
type PositionConstant = `left` | `midleft` | `center` | `midright` | `right`
type VelocityConstant = `left` | `right` | `none`
type SplitTypeConstant = `normal` | `triple`
type Position = PositionConstant | number
type Velocity = VelocityConstant | number
// LevelSpec type helpers
type GravityConstant = `normal` | `low`
// WallSpec type helpers
type BubbleUnlock = {
  bubbleTarget: BubbleId,
  type: `bubble`,
}
type TimeUnlock = {
  time: number,
  type: `time`,
}
type WallUnlock = BubbleUnlock | TimeUnlock

// Types for use around the game
export type BubbleSpec = {
  color: BubbleColor,
  // TODO: customBehavior
  id: BubbleId,
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
export type WallSpec = {
  position: Position,
  type: `withdoor` | `removable`,
  unlockCondition: WallUnlock,
}
