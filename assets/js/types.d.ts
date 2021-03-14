// BubbleSpec type helpers
export type BubbleColor = `RED` | `ORANGE` | `YELLOW` | `GREEN` | `BLUE` | `PURPLE`
// TODO: Eventually define a pattern if possible?
export type BubbleId = string
export type PositionConstant = `LEFT` | `MIDLEFT` | `CENTER` | `MIDRIGHT` | `RIGHT`
export type PositionFunction = (() => number) | ((levelWidth: number, bubbleWidth: number) => number)
export type VelocityConstant = `LEFT` | `RIGHT` | `NONE`
export type SplitTypeConstant = `NORMAL` | `TRIPLE`
export type Position = PositionConstant | number
export type Velocity = VelocityConstant | number
// LevelSpec type helpers
export type GravityConstant = `NORMAL` | `LOW`
// WallSpec type helpers
export type BubbleUnlock = {
  bubbleTarget: BubbleId,
  type: `bubble`,
}
export type TimeUnlock = {
  time: number,
  type: `time`,
}
export type WallUnlock = BubbleUnlock | TimeUnlock

// Composite types
export type BubbleSpec = {
  color: BubbleColor,
  // TODO: customBehavior
  initialPosition: [Position, Position],
  initialVelocity: Velocity,
  size: number,
  splitTrajectories: SplitTypeConstant | Velocity[],
}
export type BubbleType = BubbleSpec & {
  id: string
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
