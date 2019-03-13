import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import {
  getSymbols,
  analytics
} from './utils.js'

var selection = sketch.getSelectedDocument().selectedLayers

export default context => {
  let c = 0
  try {
    let symbols = getSymbols(selection)
    symbols.map(symbol => {
      symbol.overrides.map(override => {
        if (override.editable) {
          override.editable = false
          c++
        }
      })
    })
    context.document.reloadInspector()
    analytics("Success", c)
    return UI.message(context.command.name() + ": " + c + " overrides in " + symbols.length + " symbols disabled.")
  } catch (e) {
    return e
  }
}
