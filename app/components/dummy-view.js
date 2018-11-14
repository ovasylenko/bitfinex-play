import React from 'react';
import PropTypes from 'prop-types'
import Head from './head'

const DummyView = props => (
  <div style={{ margin: '0 auto' }}>
    <Head title={`Dummy View - ${props.name} - To Be Replaced`} />
    <div> dummy page  - { props.name } </div>
  </div>
);

DummyView.propTypes = {
  name: PropTypes.string.isRequired
}

export default DummyView;
