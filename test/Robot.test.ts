import { Orientation } from '../src/enums'
import { Robot } from '../src/Robot'

describe('Robot', () => {
  it('should throw an error with the correct message when it tries to execute command before a command is set', () => {
    const robot = new Robot()

    expect(() => {
      robot.executeCommand('MOVE')
    }).toThrow('There is no command to execute')
  })

  it.each([
    {
      commandText: 'PLACE 0, 4, NORTH',
      commandTaken: 'Place Command'
    },
    {
      commandText: 'PLACE 0, 4, SOUTH',
      commandTaken: 'Place Command'
    },
    {
      commandText: 'PLACE 0, 4, WEST',
      commandTaken: 'Place Command'
    },
    {
      commandText: 'PLACE 0, 4, EAST',
      commandTaken: 'Place Command'
    },
    {
      commandText: 'PLACE 0,4,EAST',
      commandTaken: 'Place Command'
    },
    {
      commandText: 'PLACE 0,4,LEFT',
      commandTaken: 'Invalid Command'
    },
    {
      commandText: 'MOVE',
      commandTaken: 'Move Command'
    },
    {
      commandText: 'Move',
      commandTaken: 'Invalid Command'
    },
    {
      commandText: 'LEFT',
      commandTaken: 'Left Command'
    },
    {
      commandText: 'Left',
      commandTaken: 'Invalid Command'
    },
    {
      commandText: 'RIGHT',
      commandTaken: 'Right Command'
    },
    {
      commandText: 'Right',
      commandTaken: 'Invalid Command'
    },
    {
      commandText: 'REPORT',
      commandTaken: 'Report Command'
    },
    {
      commandText: 'Report',
      commandTaken: 'Invalid Command'
    },
    {
      commandText: 'This is an invalid command',
      commandTaken: 'Invalid Command'
    }
  ])('should take $commandTaken from command text $commandText', ({ commandText, commandTaken }) => {
    const robot = new Robot()
    const command = robot.takeCommandFromText(commandText)
    expect(command.toString()).toBe(commandTaken)
  })

  test.each([
    {
      x: -1,
      y: -1,
      expectation: false
    },
    {
      x: 0,
      y: 0,
      expectation: true
    },
    {
      x: 1,
      y: 4,
      expectation: true
    },
    {
      x: 1,
      y: 5,
      expectation: false
    },
    {
      x: 5,
      y: 1,
      expectation: false
    }
  ])('the statement: position $x, $y is within bound is $withinBound', ({ x, y, expectation }) => {
    const robot = new Robot()
    const isPositionWithinBound = robot.checkPositionWithinBound({
      x,
      y,
      orientation: Orientation.North
    })

    expect(isPositionWithinBound).toBe(expectation)
  })

  it('should present command correctly', () => {
    const robot = new Robot()
    const spy = jest.spyOn(console, 'log').mockImplementationOnce(() => jest.fn())

    robot.presentCommand('MOVE')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('MOVE\n')
  })
})
