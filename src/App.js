import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Route, Link, Switch } from 'react-router-dom';

import './App.scss';

import {
  serverOnlineRequest,
} from './actions/universalActions';

const Home = () => (
  <p>This is the home screen</p>
);

class Posts extends React.Component {
  render() {
    const params = new URLSearchParams(this.props.location.search);

    return (
      <div>
        <h2>Posts</h2>
        <div>Search: { params.get('search')}</div>
        <div>Label: {params.get('label')}</div>
      </div>
    );
  }
}

const WillMatch = () => <h3>Matched!</h3>;

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);

    let readme;
    if (__isBrowser__) {
      /* readme = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__; */
      readme = this.props.preloadedState;
    } else {
      readme = this.props.staticContext.data;
    }

    this.state = {
      readme,
      loading: readme ? false : true,
    };
  }

  componentDidMount() {
      this.setState({
        readme: this.props.serverOnlineRequest(),
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.readme !== this.props.readme) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Button>hello</Button>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/will-match">Will Match</Link>
            </li>
            <li>
              <Link to="/will-not-match">Will Not Match</Link>
            </li>
            <li>
              <Link to="/also/will/not/match">Also Will x Not Match</Link>
            </li><li>
              <Link to="/posts?search=typescript&label=important">search</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/will-match" component={WillMatch} />
            <Route path="/posts">
              {(args) => (
                  <Posts {...args} />
              )}
            </Route>
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      readme: state.readme,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        serverOnlineRequest: () => {
            dispatch(serverOnlineRequest());
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
