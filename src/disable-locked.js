import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

var doc = sketch.getSelectedDocument(),
  selection = doc.selectedLayers

export default function(context) {
  var eventLabel, message
  if (selection.length != 1 || selection.layers[0].type != sketch.Types.SymbolMaster) {
    eventLabel = "error"
    message = "Please select a symbol master."
  } else {
    var symbol = selection.layers[0]
    symbol.overrides
      .filter(override => override.id.indexOf("/") < 0 && override.affectedLayer.locked)
      .map(layer => {
        symbol.overrides.map(override => {
          if (override.path.startsWith(layer.path)) {
            override.editable = false
          }
        })
      })
    context.document.reloadInspector()
    eventLabel = "success"
    message = "Locked layers been disabled."
  }
  analytics(context, eventLabel)
  UI.message(context.plugin.name() + ": " + message)
}
