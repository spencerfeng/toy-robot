import { Robot } from '../../src/Robot'
import { LeftCommand, PlaceCommand } from '../../src/command'
import { Orientation } from '../../src/enums'

describe('LeftCommand', () => {
  it('should return undefined and should not present the command if the robot has not been placed after execution', () => {
    const robot = new Robot()
    const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
    const command = new LeftCommand()

    expect(command.execute('LEFT', robot)).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it.each([
    {
      currentOrientation: Orientation.North,
      newOrientation: Orientation.West
    },
    {
      currentOrientation: Orientation.East,
      newOrientation: Orientation.North
    },
    {
      currentOrientation: Orientation.South,
      newOrientation: Orientation.East
    },
    {
      currentOrientation: Orientation.West,
      newOrientation: Orientation.South
    }
  ])(
    'should change the orientation from $currentOrientation to $newOrientation and present the command text after execution',
    ({ currentOrientation, newOrientation }) => {
      const robot = new Robot()
      robot.setCommand(new PlaceCommand())
      robot.executeCommand(`PLACE 0, 0, ${currentOrientation}`)

      const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
      const command = new LeftCommand()
      const newPosition = command.execute('LEFT', robot)

      expect(newPosition?.orientation).toBe(newOrientation)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith('LEFT')
    }
  )
})
