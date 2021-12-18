import { Robot } from '../Robot'
import { Position } from '../types'
import { Command } from './Command'
import { Orientation } from '../enums'

export class MoveCommand implements Command {
  execute(commandText: string, robot: Robot): Position | undefined {
    const currentPosition = robot.getCurrentPosition()

    // the robot has not been correctly placed, we discard this command
    if (!currentPosition) return

    let newPosition: Position

    switch (currentPosition.orientation) {
      case Orientation.North:
        newPosition = {
          ...currentPosition,
          y: currentPosition.y + 1
        }
        break
      case Orientation.East:
        newPosition = {
          ...currentPosition,
          x: currentPosition.x + 1
        }
        break
      case Orientation.South:
        newPosition = {
          ...currentPosition,
          y: currentPosition.y - 1
        }
        break
      case Orientation.West:
        newPosition = {
          ...currentPosition,
          x: currentPosition.x - 1
        }
        break
    }

    if (robot.checkPositionWithinBound(newPosition)) {
      robot.presentCommand(commandText)
      return newPosition
    }

    throw new Error(`${commandText} - Ignored. (Reason: this command will move the robot off the table)`)
  }

  toString(): string {
    return 'Move Command'
  }
}
