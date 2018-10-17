import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';


class _NotFound extends Component {
  state = {
    time: 5
  };

  componentDidMount() {
    this.intervel = setInterval(() => {
      this.setState({
        time: this.state.time - 1
      });

      if (this.state.time <= 0) {
        window.clearInterval(this.intervel);
        this.props.history.push('/');
      }
    }, 1000)
  }

  render() {
    return (
      <div className="notFoundBox">
        <img src='/static/404.png'/>
        <p className="notFoundPrompt">Page not found. Will jump home page in {this.state.time} seconds</p>
      </div>
    );
  }
}

export const NotFound = withRouter(_NotFound);