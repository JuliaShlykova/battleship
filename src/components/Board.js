import './style/Board.css';
import Cell from './Cell';

const Board = ({boardName, gameboard, receiveAttack, announce}) => {

  const constCells = () => {
    let cells = []; 
    for (let i=0;i<100;i++) {
      cells.push(<Cell 
      key={i} 
      index={i} 
      boardName={boardName}
      boardCell={gameboard[i]} 
      receiveAttack={receiveAttack}/>)
    }
    return cells;
  }

  return (
    <div>
      <p>{announce}</p>
      <div className="board" name={boardName}>
        {constCells()}
      </div>
    </div>

  )
}

export default Board;