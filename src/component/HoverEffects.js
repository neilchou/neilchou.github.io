import React from 'react';
import '../style/HoverEffects.scss';

export default class HoverEffects extends React.Component {
  render() {
    return (
      <div className="hover-effects">
        <a href="/#" className="demo-icon icon-twitter">&#xf099;</a>
        <a href="/#" className="demo-icon icon-youtube-play">&#xf16a;</a>
        <a href="/#" className="demo-icon icon-apple">&#xf179;</a>
        <a href="/#" className="demo-icon icon-windows">&#xf17a;</a>
      </div>
    )
  }
}
