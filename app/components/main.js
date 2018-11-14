import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'reactstrap';

import Ticker from './ticker'
import Trades from './trades'
// import OrderBooks from './order-books'
import Head from './head'
import SymbolSelector from './symbol-selector'
import {
  initialize as initWebSocket,
  close as closeWebsocket
} from '../redux/websockets'

class Main extends React.Component {
  render() {
    const { symbol, close, initialize } = this.props
    return (
      <>
        <Head title="Hello" />
        {/* <OrderBooks /> */}
        <Button color="link" tabIndex="0" onClick={() => close(symbol)}>close</Button>
        <Button color="link" tabIndex="0" onClick={() => initialize(symbol)}>Start</Button>

        <SymbolSelector />
        <div className="row">
          <div className="col-md-5"><Ticker /></div>
          <div className="col-md-7"><Trades /></div>
        </div>
      </>
    )
  }
}

Main.propTypes = {
  initialize: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  symbol: state.settings.symbol
})


const mapDispatchToProps = dispatch => bindActionCreators({
  initialize: initWebSocket,
  close: closeWebsocket
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
