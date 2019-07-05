import React from 'react';

// const numbers = [1, 2, 3, 4, 5];
// const items = numbers.map((number) => <li>{number}</li>);

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    // this.numbers = [1, 2, 3, 4, 5];
    this.items = props.numbers.map((number) => <li key={number.toString()}>{number}</li>);
  }
  render() {
    return (
      <ul>
        {this.items}
      </ul>
    )
  }
}


export default ListItems;