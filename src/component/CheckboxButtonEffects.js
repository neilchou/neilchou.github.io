import React, { Component } from 'react';
import '../style/CheckboxButtonEffects.scss';

export default class CheckboxButtonEffects extends Component {
  render() {
    return (
      <div className="check-box-button">
        <input type="checkbox" name="box-button" id="button"/>
      </div>
    )
  }
}
