import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics'

export function getSymbols(selection) {
  let symbols = selection.layers.filter(
    layer => layer.type == sketch.Types.SymbolMaster
  )
  if (symbols.length < 1) {
    analytics('Selection Error')
    throw errorMessage('Please select symbol masters.')
  } else {
    return symbols
  }
}

export function message(msg, status) {
  let emoji = ''
  switch (status) {
    case 'error':
      emoji = '⚠️   '
      break
    case 'success':
      emoji = '✅   '
      break
  }
  UI.message(emoji + context.command.name() + ': ' + msg)
}

export function errorMessage(msg) {
  return message(msg, 'error')
}
export function successMessage(msg) {
  return message(msg, 'success')
}
