import sketch from 'sketch/dom'
import analytics from './analytics'
import { getSymbols, successMessage } from './utils'

var selection = sketch.getSelectedDocument().selectedLayers

export default function(context) {
  try {
    let symbols = getSymbols(selection)
    let c = 0
    symbols.map(symbol => {
      symbol.overrides.map(override => {
        if (override.editable) {
          override.editable = false
        }
        c++
      })
    })
    context.document.reloadInspector()
    analytics('Success', c)
    return successMessage(
      c + ' overrides in ' + symbols.length + ' symbols disabled.'
    )
  } catch (e) {
    return e
  }
}
