import { Robot } from '../Robot'
import { Command } from './Command'
import { Position } from '../types'
import { Orientation } from '../enums'

const TURN_LEFT_ORIENTATION_MAPPING: Record<Orientation, Orientation> = {
  [Orientation.North]: Orientation.West,
  [Orientation.West]: Orientation.South,
  [Orientation.East]: Orientation.North,
  [Orientation.South]: Orientation.East
}

export class LeftCommand implements Command {
  execute(commandText: string, robot: Robot): Position | undefined {
    const currentPosition = robot.getCurrentPosition()

    // the robot has not been correctly placed, we discard this command
    if (!currentPosition) return

    let newPosition = {
      ...currentPosition,
      orientation: TURN_LEFT_ORIENTATION_MAPPING[currentPosition.orientation]
    }

    robot.presentCommand(commandText)
    return newPosition
  }

  toString(): string {
    return 'Left Command'
  }
}
