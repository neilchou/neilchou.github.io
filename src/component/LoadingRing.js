import React, { Component } from 'react';
import '../style/LoadingRing.scss';

export default class LoadingRing extends Component {
  render() {
    return (
      <div className="loader-ring">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    )
  }
}
