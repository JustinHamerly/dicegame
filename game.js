import { rollDice, calculateScore } from './game_logic';
import Banker from './banker';

class Game{
  constructor(numRounds = 20){
    this.banker = new Banker();
    this.numRounds = numRounds;
    this.roundNum = 0;
  }


}