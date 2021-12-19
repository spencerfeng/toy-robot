import { Robot } from '../../src/Robot'
import { InvalidCommand, PlaceCommand } from '../../src/command'

describe('InvalidCommand', () => {
  it('should return undefined and should not present the command after execution if the robot has not been placed', () => {
    const robot = new Robot()
    const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
    const command = new InvalidCommand()

    expect(command.execute('INVALID COMMAND', robot)).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should throw an error with the correct message after execution if the robot has been correctly place', () => {
    const robot = new Robot()
    robot.setCommand(new PlaceCommand())
    robot.executeCommand('PLACE 0, 0, NORTH')

    expect(() => {
      new InvalidCommand().execute('INVALID COMMAND', robot)
    }).toThrow('INVALID COMMAND - Ignored. (Reason: this command is an invalid command)')
  })
})
