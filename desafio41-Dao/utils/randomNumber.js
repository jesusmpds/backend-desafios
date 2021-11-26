const generateRandomNumber = (cant) => {
    const objectNumbers = {};
    const arrayNumbers = [];

    for (i = 1; i <= cant; i++) {
      arrayNumbers.push(Math.floor(Math.random() * 1000 + 1));
    }

    arrayNumbers.forEach((numberKey) => {
      objectNumbers[numberKey] = objectNumbers[numberKey] == undefined ? 1 : objectNumbers[numberKey] + 1;
    });
    return objectNumbers;
}

process.on("message", (cant)=>{
  const cantidadDeNumeros = parseInt(cant);

  const numbers = generateRandomNumber(cantidadDeNumeros);
  console.log(process.pid)
  process.send(numbers)
})
