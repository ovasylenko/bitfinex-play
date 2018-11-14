import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

const formatDecimal = format('.2f');
const formatDate = timeFormat('%Y %B %d %H:%M:%S')

class Trades extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    // return this.props.children;
    return (
      <>
        <table className="table table-sm text-left">
          <tbody>
            <tr>
              <td>Date</td>
              <td>Price</td>
              <td>Rate</td>
            </tr>
            { this.props.trades.map((trade) => {
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
