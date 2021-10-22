// const {fork} = require('child_process')
const generateRandomNumber = require('../utils/randomNumber')

const randomNumberController = (req,res,next)=>{
    let {cant} = req.query

    if( cant === undefined) cant = 100000000;
    const objNumbers = generateRandomNumber(cant)
    return res.json(objNumbers);
    // const randomNumberChildProcess = fork('./utils/randomNumber.js')
    // console.log(process.pid)
    // randomNumberChildProcess.on("message", (numbers) =>{
    //     res.json(numbers);
    //     return
    // })
    // randomNumberChildProcess.send(cant);
    // return
}

module.exports = randomNumberController;