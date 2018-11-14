import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { initialize } from '../redux/websockets';

class Startup extends React.Component {
  componentWillMount() {
    this.props.initialize(this.props.symbol);
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

Startup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  initialize: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
}

Startup.defaultProps = {
}

const mapStateToProps = state => ({
  symbol: state.settings.symbol
})

const mapDispatchToProps = dispatch => bindActionCreators({ initialize }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Startup))
