import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from './slider';

export default class Default extends Component {
  render() {
    return (
      <div>
      <header className="App-header">
      <div className="btn-cont">
        <button type="button" className="outlined-btn">
          <Link href="/login">LOGIN</Link>
        </button>
        <button type="button" className="outlined-btn">
          <Link href="/signup">SIGNUP</Link>
        </button>
      </div>
        <Slider />
      </header>
        <h3>This is Default page</h3>
      </div>
    );
  }
}
