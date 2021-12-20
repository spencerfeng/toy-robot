import { Robot } from '../Robot'
import { Command } from './Command'
import { Position } from '../types'
import { Orientation } from '../enums'
import { placeCommandRegex } from '../constants'

export class PlaceCommand implements Command {
  execute(commandText: string, robot: Robot): Position | undefined {
    const match = placeCommandRegex.exec(commandText)
    if (match === null) {
      throw new Error(`${commandText} - Ignored. (Reason: this command is an invalid command)`)
    }

    const [_, x, y, orientation] = match
    const parsedX = parseInt(x, 10)
    const parsedY = parseInt(y, 10)

    if (isNaN(parsedX) || isNaN(parsedY) || !Object.values<string>(Orientation).includes(orientation)) {
      throw new Error(`${commandText} - Ignored. (Reason: this command is an invalid command)`)
    }

    const newPosition = {
      x: parsedX,
      y: parsedY,
      // it is safe to do the cast here
      orientation: orientation as Orientation
    }

    if (robot.checkPositionWithinBound(newPosition)) {
      robot.presentCommand(commandText)
      return newPosition
    }

    throw new Error(`${commandText} - Ignored. (Reason: this command will move the robot off the table)`)
  }

  toString(): string {
    return 'Place Command'
  }
}
