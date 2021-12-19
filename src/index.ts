import { App } from './App'
import { Robot } from './Robot'

const filePath = './commands.txt'

const robot = new Robot()

const app = new App(filePath, robot)
app.start().catch((error) => {
  app.handleError(error)
})
