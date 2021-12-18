import fs from 'fs'
import readline from 'readline'
import { Robot } from './Robot'
import { getErrorMessage } from './utils'
import { commandGroupHeaderFormattingRegex, emptyLineFormattingRegex } from './constants'

export class App {
  private filePath: string
  private robot: Robot

  constructor(filePath: string, robot: Robot) {
    this.robot = robot
    this.filePath = filePath
  }

  private processFormatting(line: string): boolean {
    if (commandGroupHeaderFormattingRegex.test(line) || emptyLineFormattingRegex.test(line)) {
      this.robot.presentCommand(line)
      return true
    }

    return false
  }

  private createReadStreamSafe(filePath: string): Promise<fs.ReadStream> {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(filePath)
      fileStream.on('error', reject).on('open', () => {
        resolve(fileStream)
      })
    })
  }

  async start() {
    const fileStream = await this.createReadStreamSafe(this.filePath)

    const rl = readline.createInterface({
      input: fileStream,
      output: process.stdout,
      terminal: false
    })

    for await (const line of rl) {
      if (this.processFormatting(line)) continue

      const command = this.robot.takeCommandFromText(line)
      this.robot.setCommand(command)

      try {
        this.robot.executeCommand(line)
      } catch (error) {
        this.handleError(error)
      }
    }
  }

  handleError(error: unknown) {
    console.log(`${getErrorMessage(error)}\n`)
  }
}
