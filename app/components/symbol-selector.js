import React from 'react';
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Symbols from '../redux/symbols'
import { updateSymbol } from '../redux/reducers/settings'
import { reInitialize } from '../redux/websockets'

class Selector extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  update(symb) {
    return () => {
      this.props.updateSymbol(symb);
      this.props.reInitialize(symb);
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {Symbols.find(it => it.value === this.props.symbol).label}
        </DropdownToggle>
        <DropdownMenu>
          {
            Symbols.map((it) => {
              return (
                <DropdownItem key={it.value} onClick={this.update(it.value)}>
                  {it.label}
                </DropdownItem>
              );
            })
          }

        </DropdownMenu>
      </Dropdown>
    );
  }
}

Selector.propTypes = {
  updateSymbol: PropTypes.func.isRequired,
  reInitialize: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
}

Selector.defaultProps = {}
const mapStateToProps = state => ({
  symbol: state.settings.symbol
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateSymbol, reInitialize }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Selector)
