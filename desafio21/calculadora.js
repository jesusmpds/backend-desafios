class Calculadora {
    constructor(){}

    Sumar(a,b){
        if(typeof (a || b) === 'string') return NaN;
        return a + b;
    }
    
    Restar(a,b){
        return a - b;
    }

    Dividir (a,b){
        return a / b;
    }

    Multiplicar(a,b){
        return a * b;
    }
}

module.exports = new Calculadora()