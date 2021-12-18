import { Robot } from '../Robot'
import { Command } from './Command'
import { Position } from '../types'

export class ReportCommand implements Command {
  execute(commandText: string, robot: Robot): Position | undefined {
    const currentPosition = robot.getCurrentPosition()

    // the robot has not been correctly placed, we discard this command
    if (!currentPosition) return

    robot.presentCommand(
      `${commandText}\nOutput: ${currentPosition.x}, ${currentPosition.y}, ${currentPosition.orientation}`
    )
  }

  toString(): string {
    return 'Report Command'
  }
}
