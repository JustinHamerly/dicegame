function rollDice(num=6){
  let diceArray = []
  for (let i=0; i < num; i++){
    let number = Math.ceil(Math.random() * 6)
    diceArray.push(number)
  }
  diceArray.sort();
  return diceArray;
}

function calculateScore(dice){
  if(dice.length > 6){
    console.log('You Cheater!')
  }
}

function counter(dice){
  const counts = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0}
  dice.forEach(value => {
    counts[value] ++
  })
  const countsAsArray = Object.entries(counts);
  const filtered = countsAsArray.filter(count =>  count[1] > 0);
  console.log(filtered)
  return filtered;
}