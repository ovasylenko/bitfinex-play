import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

class Books extends React.Component {
  render() {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>Price</td>
              <td>Rate</td>
              <td>Period</td>
            </tr>
            { this.props.books.map((trade) => {
              return (
                <tr key={`${trade.price}${trade.rate}${trade.period}`}>
                  <td>{trade.price}</td>
                  <td>{trade.rate}</td>
                  <td>{trade.period}</td>
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

Books.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
}

Books.defaultProps = {
  books: []
}

const mapStateToProps = state => ({
  books: state.books.books,
})

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Books))
