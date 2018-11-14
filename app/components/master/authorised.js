import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class MasterPage extends React.Component {
  render() {
    return (
      <div className="login-root">
        <div className="row">
          <main className="col-md-12 col-xs-12 p-l-2 p-t-2 container main-container">
            {this.props.children}
          </main>
        </div>
      </div>
    )
  }
}
MasterPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object)
}

MasterPage.defaultProps = {
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch: item => dispatch(item)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MasterPage);
