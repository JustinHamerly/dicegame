const Banker = require('./banker.js');
const gameLogic = require('./game_logic.js');
const prompt = require('prompt-sync')();

class Game{
  constructor(numRounds = 20){
    this.banker = new Banker();
    this.numRounds = numRounds;
    this.roundNum = 1;
    this.roller = gameLogic.rollDice;
  }

  play(roller){
    if(roller){
      this.roller = roller;
    }
    
    console.log('Welcome to Ten Thousand');
    console.log('(y)es to play or (n)o to decline');
    let input = prompt('> ');

    if(input === 'n'){
      console.log('Maybe later!')
    }else if(input === 'y'){
      for(let i=0; i<this.numRounds; i++){
        this.startRound(this.roundNum);
        this.roundNum++;
      }
      this.endGame()
    }
  }

  endGame(){
    throw 'Thanks for playing!  See you next time.'
  }

  startRound(roundNum){
    console.log('Starting round ' + roundNum);

    let numOfDice = 6;
    let roundScore = 0;

    while(true){

      console.log('Rolling ' + numOfDice + ' dice...')
  
      const roll = this.roller(numOfDice);
      console.log('>>> ' + roll + ' <<<');
  
      let rollScore = gameLogic.calculateScore(roll);
      if(rollScore === 0){
        this.zilch(roundNum)
        return
      } 
  
      const keeperValues = this.validateKeepers(roll);
      const keeperScore = gameLogic.calculateScore(keeperValues);

      roundScore += keeperScore;
      numOfDice -= keeperValues.length;
  
      console.log(`You have ${roundScore} unbanked points and ${numOfDice} dice remaining`);
      console.log('(r)oll again, (b)ank your points or (q)uit:');
  
      let input = prompt('> ');
  
      if(input === 'b'){
        this.banker.shelf(roundScore);
        let bankedPoints = this.banker.bank();
        this.endRound(roundNum, bankedPoints);
        break;
      }else if(input === 'r'){
        if(numOfDice === 0){
          numOfDice = 6;
        }
      }else if(input === 'q'){
        this.endGame();
      }
    }
  }

  zilch(roundNum){
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log("|         Zilch!!! Round over          |")
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    this.endRound(roundNum, 0)
  }

  endRound(roundNum, bankedPoints){
    console.log(`You banked ${bankedPoints} points in round ${roundNum}`);
    console.log(`Total score is ${this.banker.balance} points`);
  }

  validateKeepers(roll){
    while(true){
      console.log('Enter dice to keep, or (q)uit');
      let input = prompt('> ');
      if(input === 'q'){
        this.endGame();
      }
      let inputArray = input.split('');
      let keeperValues = [];
  
      for(let char of inputArray){  
        let parsedNum = parseInt(char);
        keeperValues.push(parsedNum);
      }
      
      if (gameLogic.validate(roll, keeperValues)){
        return keeperValues
      }else{
        console.log('Cheater!')
        console.log('>>> ' + roll + ' <<<');
      }
    }
  }
}

module.exports = Game