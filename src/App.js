import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  serverOnlineRequest,
} from './actions/universalActions';

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
        hello
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
// export default connect(mapStateToProps, mapDispatchToProps)(App);
