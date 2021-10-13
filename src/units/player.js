const Player = (isComputer=false) => {
  let name;
  const assignName = (newName) => {
    name = newName;
  }
  const getName = () => isComputer?'computer':name;

  const attack = (gameboard, index=0) => {
    if (isComputer) {
      let freeCells = [];
      for (let i=0; i<100; i++) {
        if(gameboard.getBoard()[i].isHit === false) {
          freeCells.push(i);
        };
      };
      index = freeCells[Math.floor(Math.random() * freeCells.length)];
    };
    return gameboard.receiveAttack(index);
  };

  return {assignName, getName, attack}
}

export default Player;