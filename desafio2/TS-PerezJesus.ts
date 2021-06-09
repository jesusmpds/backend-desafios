const operaciones = () =>{
    operacion(2,2,'suma').then(result => console.log(result))
    operacion(8,2,'resta').then(result => console.log(result))
}

async function operacion(number1: number, number2: number, operationName: string){
    try {
        let {Suma} = await import('./Suma')
        let {Resta} = await import('./Resta')

        if(operationName === 'suma'){
            let nuevaSuma = new Suma(number1,number2)
            return nuevaSuma.resultado()
        } 
        if (operationName === 'resta'){
            let nuevaResta = new Resta(number1,number2)
            return nuevaResta.resultado()
        }  
    } catch (error) {
        console.log(error)
    }
}

operaciones();