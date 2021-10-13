const Cell = ({index, boardCell, boardName, receiveAttack=()=>{}}) => {
  const {ship, isHit} = boardCell;

  console.log('rendering cells')

  const attack = () => {
    console.log('cell is atacked');
    receiveAttack(boardName, index);
    console.log('ship: ', ship, 'isHit: ', isHit);
  }

  return (
    <div className={`cell 
    ${(isHit)?'':'cell-active'} 
    ${ship?'cell-ship':''}
    ${(ship&&ship.isSunk())?'cell-sunk':''}` 
    }
    index={index} 
    onClick={(isHit||(boardName==='player-board'))?null:attack}
    >
      {(!ship&&isHit)?<div className="cell-missed"></div>:null}
      {(ship&&isHit)?<div className="cell-hit"></div>:null}
    </div>
  )
}

export default Cell;