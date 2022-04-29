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
    return;
  }

  const counts = counter(dice)

  if(counts.length === 6){
    score += 3000
  }

  if(counts.length === 3){
    let threePairs = true
    counts.forEach(num => {
      if(num[1] != 2){
        threePairs = false
      }
    })
    if(threePairs){
      return 1500
    }
  }

  let score = 0;

  counts.forEach(num => {
    const pipCount = num[1]

    if(num[0] == '1' && pipCount == 3){
      score += 1000
    }else if(num[1] == '1' && pipCount != 3){
      score += pipCount * 100
    }

    if(num[0] != '1' && pipCount == 3){
      const dice = parseInt(num[0])
      const value = dice * 100
      score += value
    }

    if(num[0] == '5'){
      const value = pipCount * 50
      score += value
    }
    
  })
  return score;
}

function counter(dice){
  const counts = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0}
  dice.forEach(value => {
    counts[value] ++
  })
  const countsAsArray = Object.entries(counts);
  const filtered = countsAsArray.filter(count =>  count[1] > 0);
  return filtered;
}

function validate(roll, keepers){
  let rolled = roll;
  let valid = true;

  keepers.forEach(dice => {
    let found = false;

    for(let i=0; i<rolled.length; i++){
      if(rolled[i] === dice){
        found = true;
        rolled[i] = 0
        break;
      }
    }
    
    if(found === false){
      valid = false
    }

  })

  return valid
}

console.log(validate([1,2,2,3,4,4], [1,2, 5]))
// console.log(validate([1,2,2,3,4,4], [1,6]))

module.exports = {rollDice, calculateScore, validate}