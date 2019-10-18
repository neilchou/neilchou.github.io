import React from 'react';
import '../style/LoadingBar.scss';

export default class LoadingBar extends React.Component {
  render() {
    return (
      <div className="loading-bar">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    )
  }
}
