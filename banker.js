export default class Banker{
  constructor(){
    this.balance = 0;
    this.shelved = 0;
  }

  bank(){
    let deposited = this.shelved;
    this.balance += deposited;
    this.shelved = 0;
    return deposited;
  }

  shelf(amt){
    self.shelved += amt
  }

  clearShelf(){
    self.shelved = 0
  }
}
