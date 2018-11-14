import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { format } from 'd3-format'

const formatDecimal = format('.2f');
const formatPercent = format('.2%');

class Ticker extends React.Component {
  render() {
    return (
      <table className="table table-sm text-left">
        <thead>
          <tr>
            <td>Title</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bid</td>
            <td>{formatDecimal(this.props.bid)}</td>
          </tr>
          <tr>
            <td>Bid Size</td>
            <td>{formatDecimal(this.props.bidSize)}</td>
          </tr>
          <tr>
            <td>Ask</td>
            <td>{formatDecimal(this.props.ask)}</td>
          </tr>
          <tr>
            <td>Ask Size</td>
            <td>{formatDecimal(this.props.askSize)}</td>
          </tr>
          <tr>
            <td>Daily Change</td>
            <td>{formatDecimal(this.props.dailyChange)}</td>
          </tr>
          <tr>
            <td>Daily ChangePerc</td>
            <td>{formatPercent(this.props.dailyChangePerc)}</td>
          </tr>
          <tr>
            <td>Last Price</td>
            <td>{formatDecimal(this.props.lastPrice)}</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{formatDecimal(this.props.volume)}</td>
          </tr>
        </tbody>
      </table>
    );

    // return (
    //   <>
    //     <div>{this.props.symbol}</div>
    //     <div>{this.props.bid}</div>
    //     <div>{this.props.bidSize}</div>
    //     <div>{this.props.ask}</div>
    //     <div>{this.props.askSize}</div>
    //     <div>{this.props.dailyChange}</div>
    //     <div>{this.props.dailyChangePerc}</div>
    //     <div>{this.props.lastPrice}</div>
    //     <div>{this.props.volume}</div>
    //     <div>{this.props.high}</div>
    //     <div>{this.props.low}</div>
    //   </>
    // )
  }
}

Ticker.propTypes = {
  bid: PropTypes.number,
  bidSize: PropTypes.number,
  ask: PropTypes.number,
  askSize: PropTypes.number,
  dailyChange: PropTypes.number,
  dailyChangePerc: PropTypes.number,
  lastPrice: PropTypes.number,
  volume: PropTypes.number,
}

Ticker.defaultProps = {
  bid: 0,
  bidSize: 0,
  ask: 0,
  askSize: 0,
  dailyChange: 0,
  dailyChangePerc: 0,
  lastPrice: 0,
  volume: 0,
}

const mapStateToProps = state => ({
  symbol: state.ticker.symbol,
  bid: state.ticker.bid,
  bidSize: state.ticker.bidSize,
  ask: state.ticker.ask,
  askSize: state.ticker.askSize,
  dailyChange: state.ticker.dailyChange,
  dailyChangePerc: state.ticker.dailyChangePerc,
  lastPrice: state.ticker.lastPrice,
  volume: state.ticker.volume,
})

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ticker))
