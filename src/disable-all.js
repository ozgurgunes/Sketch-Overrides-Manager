import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

var selection = sketch.getSelectedDocument().selectedLayers

export default context => {
  var message, eventLabel, eventValue
  if (selection.length != 1 || selection.layers[0].type != sketch.Types.SymbolMaster) {
    message = "Please select a symbol master."
    eventLabel = "Selection Error"
    eventValue = 0
  } else {
    selection.layers[0]
      .overrides.map(override => {
        override.editable = false
      })
    context.document.reloadInspector()
    message = "All overrides been disabled."
    eventLabel = "success"
    eventValue = selection.layers[0].overrides.length
  }
  analytics(context, eventLabel, eventValue)
  UI.message(context.command.name() + ": " + message)
}
