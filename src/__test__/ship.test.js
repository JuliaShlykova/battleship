import Ship from '../units/ship';

describe('ship logic', () => {
  let shipInstance, shipInstance2;
  beforeEach(() => {
    shipInstance = Ship(4,[1,2,3,4]);
    shipInstance2 = Ship(3,[6,7,8])
  });
  it('takes hits', () => {
    shipInstance.hit(1);
    shipInstance.hit(2);
    expect(shipInstance.hits).toEqual([1,2]);
  });
  it('isn\'t sunk', () => {
    shipInstance2.hit(8);
    expect(shipInstance.isSunk()).toBeFalsy();
    expect(shipInstance2.isSunk()).toBeFalsy();
  });
  it('is sunk', () => {
    shipInstance2.hit(6);
    shipInstance2.hit(7);
    shipInstance2.hit(8);
    expect(shipInstance2.isSunk()).toBeTruthy();
  })
})