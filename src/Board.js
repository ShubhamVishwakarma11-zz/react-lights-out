import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.2
  }
  

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon : false,
      board : this.createBoard(),
    }
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board=[];
    const booltable = [true,false];

    for (var i=0;i<this.props.nrows;i++) {
      let boardRow = [];
      for (var j=0;j<this.props.ncols;j++) {
        boardRow[j] = booltable[Math.floor(Math.random()*2)];
      }
      board[i] = boardRow;
    }
    
    console.log(board);

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCell(x,y) {
    // if this coord is actually on board, flip it
    let {ncols, nrows} = this.props;
    let newBoard = this.state.board;

    if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
      newBoard[x][y] = !newBoard[x][y];
    }
  }

  flipCellsAround(coord) {
    let {nrows, ncols} = this.props;
    let newBoard = this.state.board;
    let [x,y] = coord.split("-").map(Number);

    

    // TODO: flip this cell and the cells around it
    this.flipCell(x,y);
    this.flipCell(x-1,y);
    this.flipCell(x+1,y);
    this.flipCell(x,y-1);
    this.flipCell(x,y+1);
    // win when every cell is turned off
    // TODO: determine is the game has been won

    let gameWon = true;
    for(var i=0;i<nrows;i++) {
      for (var j=0;j<ncols;j++) {
        if (newBoard[i][j] === true) {
          gameWon = false;
        }
      }
    }
        

    this.setState({board:newBoard , hasWon:gameWon});
  }


  /** Render game board or winning message. */

  render() {
    return (
      // if the game is won, just show a winning msg & render nothing else
      // TODO

      // make table board

      // TODO
      <div>
        {this.state.hasWon === false ? <h1 className="neon-blue"> Lights Out</h1> : <h1 className="neon-orange"> You Won!!</h1> }
        
        <table className="Board">
          <tbody>
            {
              this.state.board.map((arr,i) =>{
                return (<tr key = {i}>
                  {
                    arr.map((lit,j) => {
                      // console.log(i,j,lit);
                      return (<Cell key={`${i}-${j}`} 
                                    id={`${i}-${j}`}
                                    isLit={lit} 
                                    flipCellsAroundMe={this.flipCellsAround} />)
                    })
                  }
                </tr>)
              })
            }
          </tbody>
        </table>
        
      </div>
    )

  }
}


export default Board;
