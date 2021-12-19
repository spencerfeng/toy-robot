import fs from 'fs'
import readline from 'readline'
import { App } from '../src/App'
import { Readable } from 'stream'
import { Robot } from '../src/Robot'
import { Orientation } from '../src/enums'
import { PlaceCommand } from '../src/command'

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should reject if creating the read stream from the file path fails', async () => {
    const robot = new Robot()
    const mockedReadStream = new Readable()
    jest.spyOn(fs, 'createReadStream').mockReturnValueOnce(mockedReadStream as any)

    const app = new App('invalid/file/path', robot)
    let promise = app.start()
    mockedReadStream.emit('error')
    await expect(promise).rejects.toBe(
      'Read file failed. Please make sure the file is in the same folder as the program.'
    )
  })

  it.each([
    {
      error: new Error('an error'),
      errorType: 'an Error object',
      expectedErrorMessage: 'an error\n'
    },
    {
      error: 'an error',
      errorType: 'a string',
      expectedErrorMessage: '"an error"\n'
    },
    {
      error: {
        a: 1,
        b: 2
      },
      errorType: 'an object',
      expectedErrorMessage: '{"a":1,"b":2}\n'
    }
  ])('should handle error for error type: "$errorType"', ({ error, expectedErrorMessage }) => {
    const robot = new Robot()
    const spy = jest.spyOn(console, 'log').mockImplementationOnce(() => jest.fn())
    const app = new App('a/file/path', robot)
    app.handleError(error)
    expect(spy).toHaveBeenCalledWith(expectedErrorMessage)
  })

  it('should handle command correctly', async () => {
    const mockedReadStream = new Readable()
    jest.spyOn(fs, 'createReadStream').mockReturnValueOnce(mockedReadStream as any)
    jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => {
      return ['a)------', '', 'MOVE', 'LEFT', 'INVALID COMMAND'] as any
    })
    const robot = new Robot()
    robot.setCommand(new PlaceCommand())
    robot.executeCommand(`PLACE 0,0,${Orientation.North}`)

    const spyOnRobotExecuteCommand = jest.spyOn(robot, 'executeCommand').mockImplementationOnce(() => jest.fn())
    const spyOnRobotPresentCommand = jest.spyOn(robot, 'presentCommand').mockImplementationOnce(() => jest.fn())
    const app = new App('a/file/path', robot)
    const spyOnAppHandleError = jest.spyOn(app, 'handleError').mockImplementationOnce(() => jest.fn())

    let promise = app.start()
    mockedReadStream.emit('open')

    await expect(promise).resolves.toBe(undefined)
    expect(spyOnRobotExecuteCommand).toHaveBeenCalledTimes(3)
    expect(spyOnAppHandleError).toHaveBeenCalledTimes(1)
    expect(spyOnRobotPresentCommand).toHaveBeenCalledTimes(3)
  })
})
