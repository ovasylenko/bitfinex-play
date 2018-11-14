import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

const Head = props => (
  <Helmet>
    <title> { props.title }</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#FF0000" />
    <link rel="stylesheet" href="/css/main.css" />
  </Helmet>
);

Head.propTypes = {
  title: PropTypes.string.isRequired
}

export default Head;
