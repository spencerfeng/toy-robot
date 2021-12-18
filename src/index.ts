import { App } from './App'
import { Robot } from './Robot'

const filePath = './commands.txt'

const robot = new Robot({
  x: 0,
  y: 0,
  width: 5,
  height: 5
})

const app = new App(filePath, robot)
app.start().catch((error) => {
  app.handleError(error)
})
