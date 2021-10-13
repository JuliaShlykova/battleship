import Gameboard from "../units/gameboard";

describe('gameboard logic', () => {
  let gameboard1 = Gameboard();

  beforeEach(() => {
    gameboard1.init();
    gameboard1.placeShip(4,[10,11,12,13]);
    gameboard1.placeShip(3,[20,30,40]);
  });

  it('receives attack', () => {
    expect(gameboard1.receiveAttack(10)).toBe('Ship is hit!');
    gameboard1.receiveAttack(20);
    gameboard1.receiveAttack(30);
    expect(gameboard1.receiveAttack(40)).toBe('Ship is sunk!');
  });

  it('can miss', () => {
    expect(gameboard1.receiveAttack(9)).toBe('Miss!');
    expect(gameboard1.getBoard()[9].isHit).toBeTruthy();
  });

  test('not all ships are sunk', () => {
    gameboard1.receiveAttack(20);
    gameboard1.receiveAttack(30);
    gameboard1.receiveAttack(40);
    expect(gameboard1.allShipsSunk(2)).toBeFalsy();
  });

  test('all ships are sunk', () => {
    for(let i of [10,11,12,13,20,30,40]) {
      gameboard1.receiveAttack(i);
    }
    expect(gameboard1.allShipsSunk(2)).toBeTruthy();
  });
})