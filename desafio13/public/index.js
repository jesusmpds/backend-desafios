const socket = io();

// Add new product to the table
socket.on('newProduct', data => {
    let notFoundAlert = document.getElementById('noProductFound')
    if(notFoundAlert){
        notFoundAlert.remove()
    }
    let lastProduct = data.productos.length -1
    let tbody = document.getElementById("productos")

    tbody.insertRow().innerHTML = `
        <td>${data.productos[lastProduct].title}</td>
        <td>$ ${data.productos[lastProduct].price}</td>
        <td>
            <img src="${data.productos[lastProduct].thumbnail}" class="img-thumbnail"/>
        </td>
    `
});

// Event listener
let form = document.getElementById('form');

let title = document.getElementById('nombreProducto');
let price = document.getElementById('precioProducto');
let thumbnail = document.getElementById('thumbnailURL');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    console.log(e)
    if (title.value && price.value && thumbnail.value) {
    socket.emit('newProduct', {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value
    });
    document.getElementById('alert').innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">Se creo correctamente el producto <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    document.getElementById('nombreProducto').value = '',
    document.getElementById('precioProducto').value = '',
    document.getElementById('thumbnailURL').value = '';
    };
});

// ---------------------------------------------------
//Chat

    let messages = document.getElementById('ul-chat');
    let inputEmail = document.getElementById('emailChat');
    let messageInput = document.getElementById('messageChat');
    let botonEnviar = document.getElementById('buttonSendMessage');

    botonEnviar.addEventListener('click', () => {
    if (inputEmail.value && messageInput.value) {
        socket.emit('newMessage', {
            username: inputEmail.value,
            message:messageInput.value
        });
        messageInput.value = '';
    }
    });

    //Recibir mensaje y añadirlo al front
    socket.on('newMessage', (msg)=> {
    let item = document.createElement('li');
    item.innerHTML = `<span class="badge bg-dark">${msg.username}</span> <span>${msg.date}</span>: <span>${msg.msg}</span>`;
    messages.appendChild(item);
    });