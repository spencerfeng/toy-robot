import { Robot } from '../../src/Robot'
import { MoveCommand, PlaceCommand } from '../../src/command'
import { Orientation } from '../../src/enums'

describe('LeftCommand', () => {
  it('should return undefined and should not present the command after execution if the robot has not been placed', () => {
    const robot = new Robot()
    const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
    const command = new MoveCommand()

    expect(command.execute('MOVE', robot)).toBeUndefined()
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it.each([
    {
      currentPosition: {
        x: 1,
        y: 1,
        orientation: Orientation.North
      },
      newPosition: {
        x: 1,
        y: 2,
        orientation: Orientation.North
      }
    },
    {
      currentPosition: {
        x: 1,
        y: 1,
        orientation: Orientation.East
      },
      newPosition: {
        x: 2,
        y: 1,
        orientation: Orientation.East
      }
    },
    {
      currentPosition: {
        x: 1,
        y: 1,
        orientation: Orientation.West
      },
      newPosition: {
        x: 0,
        y: 1,
        orientation: Orientation.West
      }
    },
    {
      currentPosition: {
        x: 1,
        y: 1,
        orientation: Orientation.South
      },
      newPosition: {
        x: 1,
        y: 0,
        orientation: Orientation.South
      }
    }
  ])(
    'should change the current position to the new position and present the command text after execution',
    ({ currentPosition, newPosition }) => {
      const robot = new Robot()
      robot.setCommand(new PlaceCommand())
      robot.executeCommand(`PLACE ${currentPosition.x}, ${currentPosition.y}, ${currentPosition.orientation}`)

      const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
      const command = new MoveCommand()
      const position = command.execute('MOVE', robot)

      expect(position).toEqual(newPosition)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith('MOVE')
    }
  )

  it('should throw an error with the correct message if the "MOVE" command moves the robot off the table after execution', () => {
    const robot = new Robot()
    robot.setCommand(new PlaceCommand())
    robot.executeCommand(`PLACE 0, 0, ${Orientation.South}`)

    expect(() => {
      new MoveCommand().execute('MOVE', robot)
    }).toThrow('MOVE - Ignored. (Reason: this command will move the robot off the table)')
  })
})
