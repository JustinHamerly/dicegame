function rollDice(num=6){
  let diceArray = []
  for (let i=0; i < num; i++){
    let number = Math.ceil(Math.random() * 6)
    diceArray.push(number)
  }
  return diceArray;
}

function calculateScore(dice){
  if(dice.length) > 6 
}