import { Position, Bound } from './types'
import { Command, PlaceCommand, ReportCommand, LeftCommand, RightCommand, MoveCommand, InvalidCommand } from './command'

import {
  placeCommandRegex,
  moveCommandRegex,
  leftCommandRegex,
  rightCommandRegex,
  reportCommandRegex
} from './constants'

export class Robot {
  private movementBound: Bound
  private currentPosition?: Position
  private currentCommand?: Command

  constructor(movementBound: Bound) {
    this.movementBound = movementBound
  }

  setCommand(command: Command) {
    this.currentCommand = command
  }

  getCurrentPosition(): Position | undefined {
    return this.currentPosition
  }

  executeCommand(commandText: string) {
    try {
      if (!this.currentCommand) {
        throw new Error('There is no command to execute')
      }

      this.currentPosition = this.currentCommand.execute(commandText, this)
    } catch (err) {
      throw err
    }
  }

  checkPositionWithinBound(position: Position): boolean {
    if (
      position.x < this.movementBound.x ||
      position.x > this.movementBound.x + this.movementBound.width - 1 ||
      position.y < this.movementBound.y ||
      position.y > this.movementBound.y + this.movementBound.height - 1
    ) {
      return false
    }
    return true
  }

  presentCommand(commandText: string) {
    console.log(`${commandText}\n`)
  }

  takeCommandFromText(commandText: string): Command {
    if (placeCommandRegex.test(commandText)) {
      return new PlaceCommand()
    }

    if (moveCommandRegex.test(commandText)) {
      return new MoveCommand()
    }

    if (leftCommandRegex.test(commandText)) {
      return new LeftCommand()
    }

    if (rightCommandRegex.test(commandText)) {
      return new RightCommand()
    }

    if (reportCommandRegex.test(commandText)) {
      return new ReportCommand()
    }

    return new InvalidCommand()
  }
}
