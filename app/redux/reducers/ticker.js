
const TICKER_CONNECTED = 'ticker\\TICKER_CONNECTED'
const TICKER_GET_DATA = 'ticker\\TICKER_GET_DATA'

export {
  TICKER_CONNECTED,
  TICKER_GET_DATA
}

const initialState = {
  symbol: 'tBTCUSD'
}

export default (state = initialState, action) => {
  const { type, ...actionData } = action
  switch (action.type) {
    case TICKER_CONNECTED:
      return {
        ...state,
        channelId: action.channelId,
        symbol: action.symbol,
        pair: action.pair
      }
    case TICKER_GET_DATA:
      return {
        ...state,
        ...actionData
      }
    default:
      return state
  }
}
