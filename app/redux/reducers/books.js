
const BOOKS_CONNECTED = 'books\\BOOKS_CONNECTED'
const INIT_BOOKS = 'books\\INIT_BOOKS'
const UPDATE_BOOK = 'books\\UPDATE_BOOK'
const AMOUNT_TO_SHOW = 50
export {
  BOOKS_CONNECTED,
  INIT_BOOKS,
  UPDATE_BOOK
}

const initialState = {
  symbol: 'tBTCUSD',
  precision: 'P0',
  books: []
}

export default (state = initialState, action) => {
  const { type, ...actionData } = action
  switch (action.type) {
    case BOOKS_CONNECTED:
      return {
        ...state,
        channelId: action.channelId,
        symbol: action.symbol,
        pair: action.pair,
        frequency: action.frequency,
        precision: action.precision
      }
    case INIT_BOOKS:
      return {
        ...state,
        ...actionData
      }
    case UPDATE_BOOK:
      return {
        ...state,
        books: [action.book].concat(state.books).slice(0, AMOUNT_TO_SHOW)
      }
    default:
      return state
  }
}
