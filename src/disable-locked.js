import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

var doc = sketch.getSelectedDocument(),
  selection = doc.selectedLayers

export default function(context) {
  if (selection.length != 1 || selection.layers[0].type != sketch.Types.SymbolMaster) {
    UI.message("Please select a symbol master.")
  } else {
    var symbol = selection.layers[0]
    var layers = symbol.overrides
      .filter(override => override.id.indexOf("/") < 0 && override.affectedLayer.locked)
      .map(layer => {
        layer.editable = false
        symbol.overrides.map(override => {
          if (override.path.startsWith(layer.path + "/")) {
            console.log("'OVERRIDE': %o", override.affectedLayer.name)
            override.editable = false
          }
        })
      })
    context.document.reloadInspector()
    analytics(context, 'Disable Locked Layers')
    UI.message("Overrides Manager: Locked layers been disabled.")
  }
}