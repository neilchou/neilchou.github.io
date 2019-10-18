import React from 'react'

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="https://www.google.com.tw/" onClick={handleClick}>
      Click me
    </a>
  );
};

export default ActionLink;