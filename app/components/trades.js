import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

const formatDecimal = format('.2f');
const formatDate = timeFormat('%H:%M:%S')
const formatGroup = timeFormat('%Y %B %d')

class Trades extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    // return this.props.children;
    const grouped = this.props.trades.reduce((acc, rec) => {
      acc[formatGroup(rec.date)] = acc[formatGroup(rec.date)]
        ? acc[formatGroup(rec.date)].concat([rec])
        : [rec];
      return acc
    }, {});
    const keys = Object.keys(grouped);
    const getTrades = trades => trades.map((trade) => {
      return (
        <tr
          key={trade.id}
          className={
            classnames({
              red: trade.rate < 0,
              green: trade.rate >= 0
            })
          }
        >
          <td>{formatDate(trade.date)}</td>
          <td>{formatDecimal(trade.price)}</td>
          <td>{formatDecimal(trade.rate)}</td>
        </tr>
      )
    })
    return (
      <>
        <table className="table table-sm text-left">
          <tbody>
            <tr>
              <td>Date</td>
              <td>Price</td>
              <td>Rate</td>
            </tr>
            {
              keys.map((key) => {
                return (<>
                  <tr>
                    <td colSpan="3">{key}</td>
                  </tr>
                  {
                    getTrades(grouped[key])
                  }
                </>
                )
              })
            }
          </tbody>
        </table>
      </>
    )
  }
}

Trades.propTypes = {
  trades: PropTypes.arrayOf(PropTypes.object),
}

Trades.defaultProps = {
  trades: []
}

const mapStateToProps = state => ({
  trades: state.trades.trades,
})

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trades))
