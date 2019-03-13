import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import send from 'sketch-module-google-analytics'

const GA_TRACKING_ID = "UA-5738625-2"

export const getSymbols = selection => {
  let symbols = selection.layers
    .filter(layer => layer.type == sketch.Types.SymbolMaster)
  if (symbols.length < 1) {
      analytics("Selection Error", 0)
    throw UI.message(context.command.name() + ": " + "Please select a symbol master.")
  } else {
    return symbols
  }
}

export const analytics = (label, value) => {
  const payload = {}
  payload.ec = context.plugin.name()
  payload.ea = context.command.name()
  if (label) { payload.el = label }
  if (value) { payload.ev = value }
  return send(context, GA_TRACKING_ID, 'event', payload)
}

