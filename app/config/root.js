import React from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import {
  Switch, Route, withRouter
} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import store, { history } from '../redux';
import NotFound from '../components/404';
import DummyView from '../components/dummy-view';
import Main from '../components/main';
import Ticker from '../components/ticker';
import Trades from '../components/trades';

import Startup from './startup';

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

// const getUrlOnLogin = () => {
//   const parsed = queryString.parse(window.location.search);
//   if (parsed.redirect_from) {
//     return parsed.redirect_from;
//   }
//   return '/';
// }


// const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
//   const func = props => (!rest.user
//     ? <Component {...props} />
//     : <Redirect to={{ pathname: getUrlOnLogin() }} />)
//   return (<Route {...rest} render={func} />)
// }

// const PrivateRoute = ({
//   component: Component,
//   isRender,
//   render,
//   ...rest
// }) => {
//   const isAuth = !!rest.user && rest.user.name != null
//   // const isAuth = true;
//   const func = props => (isAuth
//     ? <AuthorisedMasterPage {...props}><Component {...props} /></AuthorisedMasterPage>
//     : <Redirect
//       to={{
//         pathname: '/login',
//         search: queryString.stringify({
// redirect_from: props.location.pathname }, { encode: false })
//       }}
//     />)

//   return (<Route {...rest} component={func} />)
// }

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const func = (props) => {
//     return (<AuthorisedMasterPage {...props} ><Component {...props} /></AuthorisedMasterPage>)
//   }
//   return (<Route {...rest} render={func} />)
// }

// const types = {
//   component: PropTypes.func,
//   render: PropTypes.func,
//   isRender: PropTypes.bool,
//   location: PropTypes.shape({
//     pathname: PropTypes.string
//   }),
//   user: PropTypes.shape({
//     username: PropTypes.string
//   })
// };

// const defaults = {
//   component: () => null,
//   isRender: false,
//   render: () => null,
//   location: {
//     pathname: ''
//   },
//   user: null
// }

// OnlyAnonymousRoute.propTypes = types
// PrivateRoute.propTypes = types


// PrivateRoute.defaultProps = defaults
// OnlyAnonymousRoute.defaultProps = defaults

const StartupConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(Startup));

export default () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <StartupConnected>
          <DragDropContextProvider backend={HTML5Backend}>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/ticker" component={Ticker} />
              <Route exact path="/trades" component={Trades} />

              <Route exact path="/dummy" component={(props) => { return (<DummyView name="Index" {...props} />) }} />

              <Route component={NotFound} />
            </Switch>
          </DragDropContextProvider>
        </StartupConnected>
      </ConnectedRouter>
    </Provider>
  );
};
