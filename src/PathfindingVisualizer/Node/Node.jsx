import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  render() {
    
    const {
      col,
      // booleans that help us determine what class to put
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
    // compute the className right here in the component
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        // we have to put an id here if we want to easily access this node
        // with document.getElementById
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}

        // 3 mouse handlers for the walls
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}