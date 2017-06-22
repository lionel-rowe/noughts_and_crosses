import React from 'react';
import './App.css';

function Square(props) {
  
  return (
    <div className={"Square " + props.borders} onClick={props.onClick}>{props.val}</div>
  )
}

class PlayArea extends React.Component {
  
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      itsXsTurn: true,
    };
    this.borders = [
    'right bottom',
    'right bottom',
    'bottom',
    'right bottom',
    'right bottom',
    'bottom',
    'right',
    'right',
    '',
    ];
  }
  
  renderSquare(seq) {
    return (
      <Square seq={seq} val={this.state.squares[seq]} borders={this.borders[seq]} onClick={() => this.handleClick(seq)} />
    )
  }
  
  handleClick(seq) {

    if (this.state.squares[seq] || this.state.winStatus) {
      return;
    }
    
    const squares = this.state.squares.slice();
    squares[seq] = (this.state.itsXsTurn ? 'X' : 'O');

    this.setState(
      {
        squares: squares,
        itsXsTurn: !this.state.itsXsTurn,
        winStatus: checkWinner(squares),
      }
    );
  }

  renderBoard() {
    return (
      <div className="board">
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }

  renderPlayAgainScreen() {
    if (this.state.winStatus) {
      return (
        <PlayAgainScreen winner={this.state.winStatus} />
      )
    } 

  }

  render() {
    
    return (
      <div className="PlayArea">
        {this.renderBoard()}
        <div className="statusLine">
          Current turn: {this.state.itsXsTurn ? 'X' : 'O'}
        </div>

        {this.renderPlayAgainScreen()}

      </div>

    );
  }
}

class PlayAgainScreen extends React.Component {

  render() {
    return (
      <div className="PlayAgainScreen">
        <div className="container">
          <h2>{this.props.winner === 'draw' ? `It\'s a tie!` : `${this.props.winner} wins!`}</h2>
          <div className="optionButtons">
            <input type= "button" value="Play again?" />
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
        <PlayArea />
      </div>
    );
  }
}

function checkWinner(sqArr) {
  const wins = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
  ]

  //ok so this is ugly af I admit...
  for (let i=0;i<wins.length;i++) {
    if (sqArr[wins[i][0]] && sqArr[wins[i][0]] === sqArr[wins[i][1]] && sqArr[wins[i][0]] === sqArr[wins[i][2]]) {
      return sqArr[wins[i][0]];
    }
  }

  if (sqArr[0] && sqArr[1] && sqArr[2] && sqArr[3] && sqArr[4] && sqArr[5] && sqArr[6] && sqArr[7] && sqArr[8]) {
      return 'draw';
  }

}

export default App;
  