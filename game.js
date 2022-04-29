const Banker = require('./banker.js');
const gameLogic = require('./game_logic.js');
const prompt = require('prompt-sync')();

class Game{
  constructor(numRounds = 20){
    this.banker = new Banker();
    this.numRounds = numRounds;
    this.roundNum = 0;
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
    }else if(input = 'y'){
      for(let i=0; i<this.numRounds; i++){
        // play game passing in roundNum
      }
      this.endGame()
    }
  }

  endGame(){
    console.log('Thanks for playing!  See you next time.');
    return;
  }
}

const game = new Game()

game.play()
