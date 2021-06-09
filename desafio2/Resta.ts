export class Resta {
    number1: number;
    number2: number;
    constructor(number1: number,number2: number){
    this.number1 = number1;
    this.number2 = number2;
    }

    resultado (){
        return this.number1 - this.number2
    }
}