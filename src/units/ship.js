const Ship = (length, position) => {
  let hits = [];
  const hit = (index) =>  {
    hits.push(index);
  };
  const isSunk = () => {
    return position.every(elem => hits.includes(elem));
  };
  return {length, position, hits, hit, isSunk};
}

export default Ship;