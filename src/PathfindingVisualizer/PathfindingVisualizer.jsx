import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';


export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      step: 1,
      startingNodeRow: 0,
      startingNodeCol: 0,
      finishingNodeRow: 0,
      finishingNodeCol: 0
    };
  }



  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDownStart(row, col) {
    const newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
    //const { startingNodeRow, startingNodeCol } = this.state;
    this.setState({
      startingNodeRow: row,
      startingNodeCol: col
    })
  }

  handleMouseEnterStart(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithStartToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
    //const { startingNodeRow, startingNodeCol } = this.state;
    this.setState({
      startingNodeRow: row,
      startingNodeCol: col
    })
  }

  
  handleMouseDownFinish(row, col) {
    const newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
    //const { finishingNodeRow, finishingNodeCol } = this.state;
    this.setState({
      finishingNodeRow: row,
      finishingNodeCol: col
    })
  }

  handleMouseEnterFinish(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithFinishToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
    //const { finishingNodeRow, finishingNodeCol } = this.state;
    this.setState({
      finishingNodeRow: row,
      finishingNodeCol: col
    })
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const { startingNodeRow, startingNodeCol, finishingNodeCol, finishingNodeRow } = this.state;
    const startNode = grid[startingNodeRow][startingNodeCol];
    const finishNode = grid[finishingNodeRow][finishingNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    const { step } = this.state;

    switch(step) {
      case 1:
        return (
          <>
            <h1>Dijkstra Pathfinding Visualizer</h1>
            <nav>
                 <ul className='nav-text'>
                    <li className='li-start'>
                      <p>Start Node</p>
                    </li>
                    <li className='li-target'>
                      <p>Target Node</p>
                    </li>
                    <li className='li-wall'>
                      <p>Wall Node</p>
                    </li>
                    <li className='li-visited'>
                      <p>Visited Node</p>
                    </li>
                    <li className='li-shortest'>
                      <p>Shortest-path Node</p>
                    </li>
                    <li className='li-unvisited'>
                      <p>Unvisited Node</p>
                    </li>
                 </ul>
            </nav>

            <h3>First select a start node</h3>

            <div className="grid">
              {grid.map((row, rowIdx) => {
                return (
                  <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed} 
                        onMouseDown={(row, col) => this.handleMouseDownStart(row, col)}
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnterStart(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}></Node>
                    );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        )
      case 2:
        return (
          <>
            
            <h1>Dijkstra Pathfinding Visualizer</h1>
            <nav>
              <ul className='nav-text'>
                    <li className='li-start'>
                      <p>Start Node</p>
                    </li>
                    <li className='li-target'>
                      <p>Target Node</p>
                    </li>
                    <li className='li-wall'>
                      <p>Wall Node</p>
                    </li>
                    <li className='li-visited'>
                      <p>Visited Node</p>
                    </li>
                    <li className='li-shortest'>
                      <p>Shortest-path Node</p>
                    </li>
                    <li className='li-unvisited'>
                      <p>Unvisited Node</p>
                    </li>
                 </ul>
              
            </nav>
            <h3>Now select a target node</h3>
            <div className="grid">
              {grid.map((row, rowIdx) => {
                return (
                  <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed} 
                        onMouseDown={(row, col) => this.handleMouseDownFinish(row, col)}
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnterFinish(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}></Node>
                    );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        )
      case 3:
        return (
          <> 
            <h1>Dijkstra Pathfinding Visualizer</h1>
            <nav>
              <ul className='nav-text'>
                    <li className='li-start'>
                      <p>Start Node</p>
                    </li>
                    <li className='li-target'>
                      <p>Target Node</p>
                    </li>
                    <li className='li-wall'>
                      <p>Wall Node</p>
                    </li>
                    <li className='li-visited'>
                      <p>Visited Node</p>
                    </li>
                    <li className='li-shortest'>
                      <p>Shortest-path Node</p>
                    </li>
                    <li className='li-unvisited'>
                      <p>Unvisited Node</p>
                    </li>
                 </ul>
            </nav>
            
            <button className='hero-btn' onClick={() => this.visualizeDijkstra()}>
              Visualize Dijkstra's Algorithm
            </button>


            <div className="grid">
              {grid.map((row, rowIdx) => {
                return (
                  <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}></Node>
                    );
                    })}
                  </div>
                );
              })}
            </div>
            
            <div class="popup">
              <span class="close-btn" onClick={handleClick}>&times;</span>
              <p>You can click anywhere on the grid to create walls before you visualize Dijkstra's!</p>
            </div>
          </>
        )
      
    }
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithStartToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithFinishToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const handleClick = e => {
  e.currentTarget.parentNode.style.visibility = 'hidden';
}