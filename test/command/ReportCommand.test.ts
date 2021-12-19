import { Robot } from '../../src/Robot'
import { PlaceCommand, ReportCommand } from '../../src/command'

describe('ReportCommand', () => {
  it('should return undefined and should not present the command after execution if the robot has not been placed', () => {
    const robot = new Robot()
    const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
    const command = new ReportCommand()

    expect(command.execute('REPORT', robot)).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('should present the report after a successful execution', () => {
    const robot = new Robot()
    robot.setCommand(new PlaceCommand())
    robot.executeCommand('PLACE 2, 0, NORTH')

    const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
    new ReportCommand().execute('REPORT', robot)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('REPORT\nOutput: 2, 0, NORTH')
  })
})
