import React from 'react';

// const numbers = [1, 2, 3, 4, 5];
// const items = numbers.map((number) => <li>{number}</li>);
function ListItem(props) {
  return <li>{props.value}</li>;
}

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    // this.numbers = [1, 2, 3, 4, 5];
    this.items = props.numbers.map((number) => <ListItem key={number.toString()} value={number}/>);
  }value
  render() {
    return (
      <ul>
        {this.items}
      </ul>
    )
  }
}

export default ListItems;