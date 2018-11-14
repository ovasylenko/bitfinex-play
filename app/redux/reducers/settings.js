
const UPDATE_SYMBOL = 'settings\\UPDATE_SYMBOL'

export {
  UPDATE_SYMBOL
}

const initialState = {
  symbol: 'tBTCUSD'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SYMBOL:
      return {
        ...state,
        symbol: action.symbol,
      }

    default:
      return state
  }
}

export function updateSymbol(symbol) {
  return (dispatch) => {
    dispatch({ type: UPDATE_SYMBOL, symbol })
  }
}
