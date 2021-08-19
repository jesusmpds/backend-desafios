const fs = require('fs');
const dayjs = require('dayjs')

class Chat{
    constructor() {
        try {
            fs.readFileSync('./data/mensajes.json');
        } catch (error) {
            fs.writeFileSync('./data/mensajes.json', JSON.stringify([]));
        }
    }

    leer(){
        let mensajes = JSON.parse(fs.readFileSync('./data/mensajes.json'));
        return mensajes;
    }

    enviarMensaje(email, msg){
        let dateAndTime = dayjs().format('[(]DD/MM/YYYY hh[:]mm[:]ss[)]')
        let mensajes = JSON.parse(fs.readFileSync('./data/mensajes.json'));
        mensajes.push({
            username:email,
            date:dateAndTime,
            msg:msg
        });
        fs.writeFileSync('./data/mensajes.json', JSON.stringify(mensajes));

        return mensajes[mensajes.length-1];
    }
}

module.exports = Chat;