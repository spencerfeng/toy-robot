// command related regex
export const moveCommandRegex = /^MOVE$/
export const leftCommandRegex = /^LEFT$/
export const rightCommandRegex = /^RIGHT$/
export const reportCommandRegex = /^REPORT$/
export const placeCommandRegex = /^PLACE(?:\s)*(\d),(?:\s)*(\d),(?:\s)*(NORTH|EAST|SOUTH|WEST)$/

// formatting related regex
export const emptyLineFormattingRegex = /^(\s)*$/
export const commandGroupHeaderFormattingRegex = /^(([a-z]|[A-Z]|(\d)+)\))*(\s)*-*$/
