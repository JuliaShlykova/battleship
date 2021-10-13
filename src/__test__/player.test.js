import Gameboard from "../units/gameboard";
import Player from "../units/player";

describe('Player attacks', () => {
  let gameboardOfPlayer = Gameboard();
  let computer = Player(true);
  let player = Player();

  beforeEach(() => {
    gameboardOfPlayer.init();
    gameboardOfPlayer.placeShip(4,[10,11,12,13]);
    gameboardOfPlayer.placeShip(3,[20,30,40]);
  });

  test('computer has name', () => {
    expect(computer.getName()).toBe('computer');
  })

  it('takes name and returns it', () => {
    player.assignName('Bob');
    expect(player.getName()).toBe('Bob');
  })

  test('player attacks', () => {
    expect(player.attack(gameboardOfPlayer,10)).toBe('Ship is hit!');
  })

  test('computer attacks legally', () => {
    for(let i=0; i<99; i++) {
      gameboardOfPlayer.receiveAttack(i);
    }
    expect(computer.attack(gameboardOfPlayer)).toBe('Miss!');
  })
})