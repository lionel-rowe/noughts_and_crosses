import React from 'react';
import './App.css';

function Square(props) {
  
  // TODO: Add logic to check if the current square is one
  // of the winning ones; if it is, add class `.winning`
  // (styled in the CSS for win-screen board).

  return (
    <div className={"Square " + props.borders} onClick={props.onClick}>{props.val}</div>
  );
}

class Board extends React.Component {

  constructor() {
    super();
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
      <Square seq={seq} val={this.props.squares[seq]} borders={this.borders[seq]} onClick={this.props.onClick ? (() => this.props.onClick(seq)) : null} />
    )
  }

  render() {
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
}

class PlayArea extends React.Component {

  constructor() {
    super();
    this.state = this.initState();
    this.state.players = 1;
  }

  initState() {
    const initialState = {
      squares: Array(9).fill(null)
      , itsXsTurn: true
      , winStatus: null
    };
    return initialState;
  }

  handleClick(seq) {
    if (this.state.squares[seq] || this.state.winStatus) {
      return;
    }

    console.log(this);
    
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

  renderPlayAgainScreen() {
    if (this.state.winStatus) {
      return (
        <PlayAgainScreen winner={this.state.winStatus} squares={this.state.squares} clickHandler={() => this.reset()} />
      )
    }

  }

  render() {
    return (
      <div className="PlayArea">
        <Board itsXsTurn={this.state.itsXsTurn} onClick={(seq) => this.handleClick(seq)} squares={this.state.squares} />
        <div className="statusLine">
          {this.state.winStatus ? '' : `Current turn: ${this.state.itsXsTurn ? 'X' : 'O'}`}
        </div>
        <Controls players={this.state.players} clickHandler={(value) => this.setState({players: value})} />
        {this.renderPlayAgainScreen()}
      </div>
    );
  }

  reset() {
    this.setState(this.initState());
  }

}

function Controls(props) {
  return (
    <form>
      <label><input type="radio" name="players" value="one" checked={props.players === 1} onClick={() => props.clickHandler(1)} /><span />One player</label>
      <br />
      <label><input type="radio" name="players" value="two" checked={props.players === 2} onClick={() => props.clickHandler(2)} /><span />Two players</label>
    </form>
  );
}

class PlayAgainScreen extends React.Component {

  render() {
    return (
      <div className="PlayAgainScreen">
        <div className="container">
          <h2>{this.props.winner === 'draw' ? `It's a tie!` : `${this.props.winner} wins!`}</h2>
          <Board squares={this.props.squares} />
          <div className="optionButtons">
            <input type= "button" value="Play again?" onClick={this.props.clickHandler} />
          </div>
        </div>
      </div>
    );
  }

  playAgain() {
    PlayArea.reset();
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
  [0,1,2]
  , [3,4,5]
  , [6,7,8]
  , [0,3,6]
  , [1,4,7]
  , [2,5,8]
  , [0,4,8]
  , [2,4,6]
  ]

  //ok so this is ugly, I admit...
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
  