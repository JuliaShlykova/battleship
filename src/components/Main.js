import Board from "./Board";
import Gameboard from "../units/gameboard";
import { useState, useEffect } from "react";

const randomShipPosition = (length, occupiedCells=[]) => {
  let possibleInitialPosition = [];
    for (let i=10-length;i<=99;i+=10){
      let j=i+length-10;
      while (j<=i) {
        if (!(occupiedCells.includes(j))) {
          //checking if possible ship would be placed on occupied cells
          let arr = [j+1];
          let k = j+2;
          while (k-j<length){
            arr.push(k);
            k++;
          }
          if(arr.some(el => occupiedCells.includes(el))){
            j++;
            continue;
          }
          possibleInitialPosition.push(j);
        }
        j++;
      }
    }
    let initialPoint = possibleInitialPosition[Math.floor(Math.random()*possibleInitialPosition.length)];
    let point = initialPoint;
    let position = [];
    while(point-initialPoint<=length-1){
      position.push(point);
      point++;
    }
    return position;
}

const shipsPlacement = (gameboard) => {
  const shipsLength = [5,4,3,3,2];
  let occupiedCells = []
  for (let length of shipsLength) {
    //all x-axis
    let position = randomShipPosition(length, occupiedCells);
    for (let i=0;i<length;i++) {
      occupiedCells.push(position[i]);
      //push all nearby cells
      if (position[i]-10>=0) {
        occupiedCells.push(position[i]-10);
      }
      if (position[i]+10<=99){
        occupiedCells.push(position[i]+10);
      }
      if ((i===0)&&((position[i])%10!==0)) {
        occupiedCells.push(position[i]-1);
        if(position[i]+10-1<=99) {
          occupiedCells.push(position[i]+10-1);
        }
        if(position[i]-10-1>=0) {
          occupiedCells.push(position[i]-10-1);
        }
      }
      if ((i===length-1)&&((position[i])%10!==9)) {
        occupiedCells.push(position[i]+1);
        if(position[i]+10+1<=99) {
          occupiedCells.push(position[i]+10+1);
        }
        if(position[i]-10+1>=0) {
          occupiedCells.push(position[i]-10+1);
        }
      }
    }
    gameboard.placeShip(length, position);
  }
}

const constructGameboard = () => {
  let gameboard = Gameboard();
  gameboard.init();
  shipsPlacement(gameboard);
  return gameboard;
}

const Main = () => {
  const [playerBoard, setPlayerBoard] = useState(constructGameboard());
  const [computerBoard, setComputerBoard] = useState(constructGameboard());
  const [playerJustBoard, setPlayerJustBoard] = useState([...playerBoard.getBoard()]);
  const [computerJustBoard, setComputerJustBoard] = useState([...computerBoard.getBoard()]);
  const [playerAnnounce, setPlayerAnnounce] = useState('Waiting...');
  const [computerAnnounce, setComputerAnnounce] = useState('Waiting...');
  const [winner, setWinner] = useState('No winner');
  
  console.log('constructing main');

  const init = () => {
    setPlayerBoard(constructGameboard());
    setComputerBoard(constructGameboard());
    setWinner('No winner');
  }

  useEffect(() => {
    setPlayerJustBoard([...playerBoard.getBoard()]);
    setPlayerAnnounce('Waiting...');
  }, [playerBoard]);

  useEffect(() => {
    setComputerJustBoard([...computerBoard.getBoard()]);
    setComputerAnnounce('Waiting...');
  }, [computerBoard]);

  const receiveAttack = (boardName, index) => {
    if (boardName==='player-board') {
      setPlayerAnnounce(playerBoard.receiveAttack(index));
      setPlayerJustBoard([...playerBoard.getBoard()]);
      if (playerBoard.allShipsSunk(5)) {
        setWinner('Computer won');
      }
    } else {
      setComputerAnnounce(computerBoard.receiveAttack(index));
      setComputerJustBoard([...computerBoard.getBoard()]);
      if (computerBoard.allShipsSunk(5)) {
        setWinner('You won');
      }
      let freeBoard = playerJustBoard.map((el,i) => i).filter(i => !playerJustBoard[i].isHit);
      let i = freeBoard[Math.floor(Math.random()*freeBoard.length)];
      receiveAttack('player-board',i);
    }
  }

  return (
    <main>
      <h1>{winner}</h1>
      <div className="boards-zone">
        <Board boardName="player-board" gameboard={playerJustBoard} receiveAttack={receiveAttack} announce={playerAnnounce} />
        <Board boardName="computer-board" gameboard={computerJustBoard} receiveAttack={receiveAttack} announce={computerAnnounce} />
      </div>
      <button onClick={init}>New Game</button>
    </main>
  )
}

export default Main;