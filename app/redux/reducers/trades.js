const AMOUNT_TO_SHOW = 30
const TRADES_CONNECTED = 'trades\\TRADES_CONNECTED'
const TRADES_INIT_DATA = 'trades\\TRADES_INIT_DATA'
const TRADES_UPDATE_DATA = 'trades\\TRADES_UPDATE_DATA'

export {
  TRADES_CONNECTED,
  TRADES_INIT_DATA,
  TRADES_UPDATE_DATA
}

const initialState = {
  symbol: 'tBTCUSD',
  trades: []
}

export default (state = initialState, action) => {
  const { type, ...actionData } = action
  switch (action.type) {
    case TRADES_CONNECTED:
      return {
        ...state,
        channelId: action.channelId,
        symbol: action.symbol,
        pair: action.pair
      }
    case TRADES_INIT_DATA:
      return {
        ...state,
        ...actionData
      }
    case TRADES_UPDATE_DATA:
      return {
        ...state,
        trades: [action.trade].concat(state.trades).slice(0, AMOUNT_TO_SHOW)
      }
    default:
      return state
  }
}
