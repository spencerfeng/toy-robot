import { Robot } from '../../src/Robot'
import { PlaceCommand } from '../../src/command'
import { Orientation } from '../../src/enums'

describe('PlaceCommand', () => {
  it('should throw an error with the correct message when it fails to extract position or orientation information for the command text after execution', () => {
    const robot = new Robot()
    const command = new PlaceCommand()
    expect(() => {
      command.execute('PLACE zero, 0, NORTH', robot)
    }).toThrow('PLACE zero, 0, NORTH - Ignored. (Reason: this command is an invalid command)')
  })

  it('should throw an error with the correct message after execution when it places the robot outside the bound', () => {
    const robot = new Robot()
    const command = new PlaceCommand()
    expect(() => {
      command.execute('PLACE 5, 0, NORTH', robot)
    }).toThrow('PLACE 5, 0, NORTH - Ignored. (Reason: this command will move the robot off the table)')
  })

  it('should present the command and return the new position if the robot is place within the bound after execution', () => {
    const robot = new Robot()
    const spy = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
    const command = new PlaceCommand()
    const newPosition = command.execute('PLACE 1, 1, SOUTH', robot)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('PLACE 1, 1, SOUTH')
    expect(newPosition).toEqual({
      x: 1,
      y: 1,
      orientation: Orientation.South
    })
  })
})
