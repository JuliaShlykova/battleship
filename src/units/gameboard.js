import Ship from './ship';

const Gameboard = () => {
  let board, sunkShips;

  const init = () => {
    board = [];
    sunkShips = 0;
    for (let i = 0; i<100; i++) {
      board.push({
        ship: false,
        isHit: false
      });
    };
  }

  const getBoard = () => board;

  const placeShip = (length, position) => {
    const ship = Ship(length, position);
    for(let i of position) {
      board[i].ship = ship;
    };
  };

  const allShipsSunk = (n) => {
    return (sunkShips === n) ? true : false;
  }

  const receiveAttack = (index) => {
    board[index].isHit = true;
    if(board[index].ship) {
      board[index].ship.hit(index);
      if(board[index].ship.isSunk()) {
        sunkShips+=1;
        return 'Ship is sunk!';
      };
      return 'Ship is hit!';
    };
    return 'Miss!';
  };

  return {init, getBoard, placeShip, allShipsSunk, receiveAttack}
};

export default Gameboard;