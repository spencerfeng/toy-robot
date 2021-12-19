import { Robot } from '../../src/Robot'
import { Orientation } from '../../src/enums'
import { RightCommand, PlaceCommand } from '../../src/command'

describe('RightCommand', () => {
  it('should return undefined and should not present the command if the robot has not been placed after execution', () => {
    const robot = new Robot()
    const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
    const command = new RightCommand()

    expect(command.execute('RIGHT', robot)).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it.each([
    {
      currentOrientation: Orientation.North,
      newOrientation: Orientation.East
    },
    {
      currentOrientation: Orientation.East,
      newOrientation: Orientation.South
    },
    {
      currentOrientation: Orientation.South,
      newOrientation: Orientation.West
    },
    {
      currentOrientation: Orientation.West,
      newOrientation: Orientation.North
    }
  ])(
    'should change the orientation from $currentOrientation to $newOrientation and present the command text after execution',
    ({ currentOrientation, newOrientation }) => {
      const robot = new Robot()
      robot.setCommand(new PlaceCommand())
      robot.executeCommand(`PLACE 0, 0, ${currentOrientation}`)

      const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
      const command = new RightCommand()
      const newPosition = command.execute('RIGHT', robot)

      expect(newPosition?.orientation).toBe(newOrientation)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith('RIGHT')
    }
  )
})
