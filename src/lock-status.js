import sketch from 'sketch/dom'
import analytics from './analytics'
import {
  getSymbols,
  successMessage
} from './utils'

var selection = sketch.getSelectedDocument().selectedLayers

export default context => {
  try {
    let symbols = getSymbols(selection)
    let c = 0
    symbols.map(symbol => {
      symbol.overrides
        .filter(override => override.id.indexOf('/') < 0)
        .map(layer => {
          symbol.overrides
            .filter(override => override.path.startsWith(layer.path))
            .map(override => {
              if (override.editable != !override.affectedLayer.locked) {
                override.editable = !layer.affectedLayer.locked
              }
              c++
            })
        })
    })
    context.document.reloadInspector()
    analytics('Success', c)
    return successMessage(c + ' overrides in ' +
      symbols.length + ' symbols set.')
  } catch (e) {
    return e
  }
}
