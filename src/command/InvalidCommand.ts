import { Robot } from '../Robot'
import { Command } from './Command'
import { Position } from '../types'

export class InvalidCommand implements Command {
  execute(commandText: string, robot: Robot): Position | undefined {
    // the robot has not been correctly placed, we discard this command
    if (!robot.getCurrentPosition()) return

    throw new Error(`${commandText} - Ignored. (Reason: this command is an invalid command)`)
  }

  toString(): string {
    return 'Invalid Command'
  }
}
