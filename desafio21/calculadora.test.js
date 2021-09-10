const Calculadora = require('./calculadora')

describe('Testing methods', () => {

    test('Should return the sum of 1 + 2 to be 3', () => {
        expect(Calculadora.Sumar(1,2)).toBe(3);
    })
    
    test('Should return the deduction of 10 - 8 to be 2', ()=>{
        expect(Calculadora.Restar(10,8)).toBe(2)
    })

    test('Should return the division of 10 / 5 to be 2', ()=>{
        expect(Calculadora.Dividir(10,5)).toBe(2)
    })

    test('Should return de deduction of 10 * 8 to be 80', ()=>{
        expect(Calculadora.Multiplicar(10,8)).toBe(80)
    })

    test('Should return a Nan if one argument is a string', ()=>{
        expect(Calculadora.Sumar('a',8)).toBe(NaN)
    })
})
