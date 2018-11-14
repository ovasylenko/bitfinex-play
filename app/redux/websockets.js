import {
  TICKER_CONNECTED,
  TICKER_GET_DATA
} from './reducers/ticker'

import {
  TRADES_CONNECTED,
  TRADES_INIT_DATA,
  TRADES_UPDATE_DATA
} from './reducers/trades'

import {
  BOOKS_CONNECTED,
  INIT_BOOKS,
  UPDATE_BOOK
} from './reducers/books'

const API_URL = 'wss://api.bitfinex.com/ws/2'

const NOT_CHANGED = 'hb';
const UPDATE = 'tu';

let wss

const initialize = (symbolRequest) => {
  if (typeof wss !== 'undefined') {
    return () => {}
  }

  wss = new WebSocket(API_URL)
  let tickerChannelId = 0;
  let tradesChannelId = 0;
  let orderBooksChannelId = 0;

  return (dispatch) => {
    const tickerRequest = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: symbolRequest
    })

    const tradesRequest = JSON.stringify({
      event: 'subscribe',
      channel: 'trades',
      symbol: symbolRequest
    })

    const orderBooksRequest = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      symbol: symbolRequest,
      prec: 'P0'
    })

    wss.onopen = () => {
      wss.send(tickerRequest)
      wss.send(tradesRequest)
      wss.send(orderBooksRequest)
    }

    wss.onmessage = (responseMessage) => {
      const response = JSON.parse(responseMessage.data)
      if (response.event === 'subscribed') {
        if (response.channel === 'ticker') {
          const { chanId: channelId, pair, symbol } = response

          tickerChannelId = channelId
          dispatch({
            type: TICKER_CONNECTED,
            channelId,
            pair,
            symbol
          })
        } else
        if (response.channel === 'trades') {
          const { chanId: channelId, pair, symbol } = response

          tradesChannelId = channelId

          dispatch({
            type: TRADES_CONNECTED,
            channelId,
            pair,
            symbol
          })
        } else
        if (response.channel === 'book') {
          const {
            chanId: channelId,
            pair,
            symbol,
            freq: frequency,
            prec: precision
          } = response

          orderBooksChannelId = channelId

          dispatch({
            type: BOOKS_CONNECTED,
            channelId,
            pair,
            symbol,
            precision,
            frequency
          })
        }
      }
      if (Array.isArray(response)) {
        if (response[0] === tickerChannelId) {
          if (response[1] !== NOT_CHANGED) {
            const [
              bid,
              bidSize,
              ask,
              askSize,
              dailyChange,
              dailyChangePerc,
              lastPrice,
              volume,
              high,
              low
            ] = response[1];
            dispatch({
              type: TICKER_GET_DATA,
              bid,
              bidSize,
              ask,
              askSize,
              dailyChange,
              dailyChangePerc,
              lastPrice,
              volume,
              high,
              low
            })
          }
        }

        if (response[0] === tradesChannelId) {
          if (response[1] !== NOT_CHANGED) {
            if (response.length === 2) {
              dispatch({
                type: TRADES_INIT_DATA,
                trades: response[1].map((it) => {
                  return {
                    date: new Date(it[1]),
                    id: it[0],
                    price: it[3],
                    rate: it[2]
                  }
                })
              })
            } else if (response[1] === UPDATE) {
              const it = response[2]
              dispatch({
                type: TRADES_UPDATE_DATA,
                trade: {
                  date: new Date(it[1]),
                  id: it[0],
                  price: it[3],
                  rate: it[2]
                }
              })
            }
          }
        }

        if (response[0] === orderBooksChannelId) {
          if (response[1] !== NOT_CHANGED) {
            if (response.length > 3) {
              dispatch({
                type: INIT_BOOKS,
                books: response[1].map((it) => {
                  return {
                    price: it[0],
                    rate: it[1],
                    period: it[2]
                  }
                })
              })
            } else {
              const it = response[1]
              dispatch({
                type: UPDATE_BOOK,
                book: {
                  price: it[0],
                  rate: it[1],
                  period: it[2]
                }
              })
            }
          }
        }
      }
      // BID,
      // BID_SIZE,
      // ask,
      // ASK_SIZE,
      // daily_change,
      // daily_change_perc,
      // last_price,
      // VOLUME,
      // HIGH,
      // low
    }
  }
}
const close = () => {
  if (typeof wss === 'undefined') {
    return;
  }

  wss.close();
  wss = undefined
}
const reInitialize = (symbol) => {
  close();
  return initialize(symbol)
}
export {
  close,
  initialize,
  reInitialize
}
