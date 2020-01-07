import React from 'react';
import './Game.css';
import Cell from '../Cell';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';

export const CELL_SIZE = 20;
export const WIDTH = 800;
export const HEIGHT = 600;


const styles = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    color: 'white',
    margin: theme.spacing(1),
  },
});


class Game extends React.Component {
  state = {cells: [], isRunning: false, interval: 1000};

  constructor(props) {
    super(props);
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeEmptyBoard();
    this.boardRef = React.createRef();
  }

  /*
  * ----------------
  * ---GAME LOGIC---
  * ----------------
  */

  runGame = () => {
    this.setState({isRunning: true});
    this.runIteration();
  };

  stopGame = () => {
    this.setState({isRunning: false});
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  runIteration() {
    console.log('running iteration');
    let newBoard = this.makeEmptyBoard();

    // Game logic
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.board = newBoard;
    this.setState({cells: this.makeCells()});
    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }

  calculateNeighbors(board, x, y) {
    let neighbors = 0;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
        neighbors++;
      }
    }

    return neighbors;
  }

  /*
  * ----------------
  * -----BOARD------
  * ----------------
  */

  // Create an empty board
  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  // Create cells from this.board
  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({x, y});
        }
      }
    }
    return cells;
  }

  getElementOffset() {
    const rect = this.boardRef.current.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop,
    };
  }

  /*
  * ----------------
  * ----HANDLERS----
  * ----------------
  */
  handleIntervalChange = (event) => {
    this.setState(this.setState({interval: event.target.value}));
  };

  handleClick = (event) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }
    this.setState({cells: this.makeCells()});
  };

  handleRandom = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = (Math.random() >= 0.5);
      }
    }
    this.setState({cells: this.makeCells()});
  };

  handleClear = () => {
    this.board = this.makeEmptyBoard();
    this.setState({cells: this.makeCells()});
  };


  render() {
    const {cells} = this.state;
    const {classes} = this.props;
    return (
        <div>
          <div className="Board"
               style={{
                 width: WIDTH,
                 height: HEIGHT,
                 backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
               }}
               onClick={this.handleClick}
               ref={this.boardRef}
          >
            {cells.map(cell => (
                <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
            ))}
          </div>
          <div className="controls">
            <TextField label={'Update (ms)'} variant={'outlined'}
                       className={classes.margin} InputLabelProps={{className: classes.textField}}
                       InputProps={{className: classes.textField}}
                       type={'number'} value={this.state.interval} onChange={this.handleIntervalChange}
            />
            <div className={'buttons'}>
              <Button className={classes.margin} onClick={this.handleRandom}
                      variant={'contained'} color={'primary'}>Random</Button>
              <Button className={classes.margin} onClick={this.handleClear}
                      variant={'contained'} color={'primary'}>Clear</Button>
              {this.state.isRunning ?
                  <Button className={classes.margin} onClick={this.stopGame}
                          variant={'contained'} color={'secondary'}>Stop</Button> :
                  <Button className={classes.margin} onClick={this.runGame}
                          variant={'contained'} color={'primary'}>Run</Button>}
            </div>
          </div>
        </div>
    );
  }
}


export default withStyles(styles)(Game);
