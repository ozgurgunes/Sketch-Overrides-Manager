import sketch from 'sketch/dom'
import UI from 'sketch/ui'
import send from 'sketch-module-google-analytics'

export const getSymbols = selection => {
  let symbols = selection.layers
    .filter(layer => layer.type == sketch.Types.SymbolMaster)
  if (symbols.length < 1) {
      analytics("Selection Error")
    throw errorMessage("Please select symbol masters.")
  } else {
    return symbols
  }
}

export const message = (msg, status) => {
  let emoji = ""
  switch (status) {
  case "error":
    emoji = "⚠️   "
    break;
  case "success":
    emoji = "✅   "
    break;
  }
  UI.message(emoji + context.command.name() + ": " + msg)
}

export const errorMessage = msg => message(msg, "error")
export const successMessage = msg => message(msg, "success")

export const analytics = (label, value) => {
  const ID = "UA-5738625-2"
  const payload = {}
  payload.ec = context.plugin.name()
  payload.ea = context.command.name()
  if (label) { payload.el = label }
  if (value) { payload.ev = value }
  return send(context, ID, 'event', payload)
}

