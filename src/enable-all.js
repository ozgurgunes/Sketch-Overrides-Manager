import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import analytics from './analytics.js'

var doc = sketch.getSelectedDocument(),
  selection = doc.selectedLayers

export default function() {
  if (selection.length != 1 || selection.layers[0].type != sketch.Types.SymbolMaster) {
    UI.message("Please select a symbol master.")
  } else {
    var symbol = selection.layers[0]    
    symbol.overrides.map(override => {
      override.editable = true
    })
      //doc.selectedPage.changeSelectionBySelectingLayers(symbol)
    context.document.reloadInspector()
    analytics(context, 'Enable All Overrides')
    UI.message("Overrides Manager: All overrides been enabled.")
  }
}
