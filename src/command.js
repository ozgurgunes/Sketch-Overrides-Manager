import { successMessage, errorMessage } from '@ozgurgunes/sketch-plugin-ui'
import analytics from '@ozgurgunes/sketch-plugin-analytics'
import sketch from 'sketch/dom'

export function getSymbols() {
  let selection = sketch.getSelectedDocument().selectedLayers
  let symbols = selection.layers.filter(
    layer => layer.type == sketch.Types.SymbolMaster
  )
  if (symbols.length < 1) {
    analytics('Selection Error')
    return errorMessage('Please select a symbol master.')
  } else {
    return symbols
  }
}

export function enableAll() {
  let symbols = getSymbols()
  if (!symbols) return
  let c = 0
  symbols.map(symbol => {
    symbol.overrides.map(override => {
      if (!override.editable) {
        override.editable = true
      }
      c++
    })
  })
  context.document.reloadInspector()
  analytics('Success', c)
  return successMessage(
    c + ' overrides in ' + symbols.length + ' symbols enabled.'
  )
}

export function disableAll() {
  let symbols = getSymbols()
  if (!symbols) return
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
}

export function dependOnLockStatus() {
  let symbols = getSymbols()
  if (!symbols) return
  let c = 0
  symbols.map(symbol => {
    symbol.overrides
      .filter(override => override.id.indexOf('/') < 0)
      .map(layer => {
        symbol.overrides
          .filter(override => override.path.startsWith(layer.path))
          .map(override => {
            override.editable = !layer.affectedLayer.locked
            c++
          })
      })
  })
  context.document.reloadInspector()
  analytics('Success', c)
  return successMessage(c + ' overrides in ' + symbols.length + ' symbols set.')
}

export function enableUnlocked() {
  let symbols = getSymbols()
  if (!symbols) return
  let c = 0
  symbols.map(symbol => {
    symbol.overrides
      .filter(
        override =>
          override.id.indexOf('/') < 0 && !override.affectedLayer.locked
      )
      .map(layer => {
        symbol.overrides
          .filter(override => override.path.startsWith(layer.path))
          .map(override => {
            if (!override.editable) {
              override.editable = true
            }
            c++
          })
      })
  })
  context.document.reloadInspector()
  analytics('Success', c)
  return successMessage(
    c + ' overrides in ' + symbols.length + ' symbols enabled.'
  )
}

export function disableLocked() {
  let symbols = getSymbols()
  if (!symbols) return
  let c = 0
  symbols.map(symbol => {
    symbol.overrides
      .filter(
        override =>
          override.id.indexOf('/') < 0 && override.affectedLayer.locked
      )
      .map(layer => {
        symbol.overrides
          .filter(override => override.path.startsWith(layer.path))
          .map(override => {
            if (override.editable) {
              override.editable = false
            }
            c++
          })
      })
  })
  context.document.reloadInspector()
  analytics('Success', c)
  return successMessage(
    c + ' overrides in ' + symbols.length + ' symbols disabled.'
  )
}

export function enableTextOverrides() {
  let symbols = getSymbols()
  if (!symbols) return
  let c = 0
  symbols.map(symbol => {
    symbol.overrides.map(override => {
      if (override.property == 'stringValue') {
        override.editable = true
      }
      c++
    })
  })
  context.document.reloadInspector()
  analytics('Success', c)
  return successMessage(
    c + ' overrides in ' + symbols.length + ' symbols enabled.'
  )
}

export function disableTextOverrides() {
  let symbols = getSymbols()
  if (!symbols) return
  let c = 0
  symbols.map(symbol => {
    symbol.overrides.map(override => {
      if (override.property == 'stringValue') {
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
}
