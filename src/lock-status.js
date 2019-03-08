import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

var selection = sketch.getSelectedDocument().selectedLayers

export default function(context) {
  var eventLabel, message
  if (selection.length != 1 || selection.layers[0].type != sketch.Types.SymbolMaster) {
    eventLabel = "error"
    message = "Please select a symbol master."
  } else {
    var symbol = selection.layers[0]
    symbol.overrides
      .filter(override => override.id.indexOf("/") < 0)
      .map(layer => {
        symbol.overrides
          .filter(override => override.path.startsWith(layer.path))
          .map(override => {
            override.editable = !layer.affectedLayer.locked
          })
      })
    context.document.reloadInspector()
    eventLabel = "success"
    message = "All overrides enabled or disabled depending on layer lock status."
  }
  analytics(context, eventLabel)
  UI.message(context.plugin.name() + ": " + message)
}
