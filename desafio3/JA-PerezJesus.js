let texto1 = "Lorem ipsum dolor sit amet,";
let texto2 = "consectetur adipiscing elit"
let texto3 = "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

const delay = ret => {
    for(let i = 0; i<ret*3e6; i++);
}

const showText = (textString, time = 1000, ammountWords, callback) =>{
    const strArray = textString.split(" ")
    ammountWords += strArray.length;

    strArray.map((element) => {
            console.log(element)
            delay(time / 3)
     });
     setTimeout(()=> callback(false, ammountWords), time)
}

showText(texto1, 1000, 0, (err, ammountWords) => {
    showText(texto2, 1000, ammountWords,(err, ammountWords) => {
        showText(texto3, 1000,ammountWords, (err, ammountWords) =>{
            console.log("Proceso finalizado")
            console.log(`Total de palabras: ${ammountWords} `)
        })
    })
})