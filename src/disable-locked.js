import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

var selection = sketch.getSelectedDocument().selectedLayers

export default context => {
  var message, eventLabel, eventValue
  if (selection.length != 1 || selection.layers[0].type != sketch.Types.SymbolMaster) {
    message = "Please select a symbol master."
    eventLabel = "Selection Error"
  } else {
    var symbol = selection.layers[0]
    symbol.overrides
      .filter(override => override.id.indexOf("/") < 0 && override.affectedLayer.locked)
      .map(layer => {
        symbol.overrides
          .filter(override => override.path.startsWith(layer.path))
          .map(override => {
            override.editable = false
          })
      })
    context.document.reloadInspector()
    message = "Locked layers been disabled."
    eventLabel = "Success"
    eventValue = selection.layers[0].overrides.length
  }
  analytics(context, eventLabel, eventValue)
  UI.message(context.command.name() + ": " + message)
}
