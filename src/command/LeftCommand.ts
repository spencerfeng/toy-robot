import { Robot } from '../Robot'
import { Command } from './Command'
import { Position } from '../types'
import { Orientation } from '../enums'

export class LeftCommand implements Command {
  execute(commandText: string, robot: Robot): Position | undefined {
    const currentPosition = robot.getCurrentPosition()

    // the robot has not been correctly placed, we discard this command
    if (!currentPosition) return

    let newPosition: Position

    switch (currentPosition.orientation) {
      case Orientation.North:
        newPosition = {
          ...currentPosition,
          orientation: Orientation.West
        }
        break
      case Orientation.East:
        newPosition = {
          ...currentPosition,
          orientation: Orientation.North
        }
        break
      case Orientation.South:
        newPosition = {
          ...currentPosition,
          orientation: Orientation.East
        }
        break
      case Orientation.West:
        newPosition = {
          ...currentPosition,
          orientation: Orientation.South
        }
        break
    }

    robot.presentCommand(commandText)
    return newPosition
  }

  toString(): string {
    return 'Left Command'
  }
}
