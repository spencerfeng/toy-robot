import { Orientation } from './enums'

export type Position = {
  x: number
  y: number
  orientation: Orientation
}

export type Bound = {
  x: number
  y: number
  width: number
  height: number
}

export type ErrorWithMessage = {
  message: string
}
