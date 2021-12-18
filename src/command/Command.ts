import { Robot } from '../Robot'
import { Position } from '../types'

export interface Command {
  execute(commandText: string, robot: Robot): Position | undefined
}
