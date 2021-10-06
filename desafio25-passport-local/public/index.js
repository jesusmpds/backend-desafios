// FRONT END EVENT LISTENERS
if(window.location.pathname === '/productos/login'){
    const username = document.getElementById('userNameLogIn')
    const password = document.getElementById('passwordlogin')
    const logInButton = document.getElementById('logInButton')

    logInButton.addEventListener('click', async () => {
        try {
            const data = {
                username: username.value,
                password:password.value
            }
            const response = await fetch('/productos/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(data)
            })
            .then( res => {
                console.log(res)
                if (res.redirected) {
                    window.location.href = res.url;
                }
            })
        } catch (error) {
            console.log(error)
        }
        
    })
}


if(window.location.pathname === '/productos/logout'){
    setTimeout(
        () => window.location.href = '/productos/login', 2500
    )
}

if(window.location.pathname === '/productos/signup'){
    const signUpButton = document.getElementById('signUpButton')
    const name = document.getElementById('nameLogIn')
    const username = document.getElementById('userNameLogIn')
    const password = document.getElementById('passwordSignUp')
   
    signUpButton.addEventListener('click', async () => {
        try {
            const data = {
                name:name.value,
                username: username.value,
                password:password.value
            }
            const response = await fetch('/productos/signup', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
              },
            body: JSON.stringify(data),
            redirect: 'follow'
            })
            .then( res => {
                if (res.redirected) {
                    window.location.href = res.url;
                }
            })
        } catch (error) {
            console.log(error)
        }
        
    })



// WEBSOCKET ----------------------------------------------------------------------------------------------//
    const socket = io();
    // Add new product to the table
    socket.on('newProduct', product => {
        let notFoundAlert = document.getElementById('noProductFound')
        if(notFoundAlert){
            notFoundAlert.remove()
        }
        let tbody = document.getElementById("productos")

        tbody.insertRow().innerHTML = `
            <td>${product.name}</td>
            <td>$ ${product.price}</td>
            <td>
                <img src="${product.imageURL}" class="img-thumbnail"/>
            </td>
            <td>${product.description}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
        `
    });


    // Event listener

    let form = document.getElementById('form');

    let title = document.getElementById('nombreProducto');
    let price = document.getElementById('precioProducto');
    let thumbnail = document.getElementById('thumbnailURL');
    let description = document.getElementById('productDescription')
    let code = document.getElementById('productCode')
    let stock = document.getElementById('productStock')

    form.addEventListener('submit', (e)=> {
        e.preventDefault();
        if (title.value && price.value && thumbnail.value && description.value && code.value && stock.value) {
        socket.emit('newProduct', {
            name: title.value,
            description: description.value,
            code: code.value,
            imageURL: thumbnail.value,
            price: price.value,
            stock: stock.value
        });
        document.getElementById('alert').innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">Se creo correctamente el producto <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        document.getElementById('nombreProducto').value = '',
        document.getElementById('precioProducto').value = '',
        document.getElementById('thumbnailURL').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('productCode').value = '';
        document.getElementById('productStock').value = '';
        };
    });

// ---------------------------------------------------
//Chat

    let messages = document.getElementById('ul-chat');
    let inputEmail = document.getElementById('emailChat');
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let userAge = document.getElementById('userAge');
    let userAlias = document.getElementById('userAlias');
    let userAvatar = document.getElementById('userAvatar');
    let messageInput = document.getElementById('messageChat');
    let botonEnviar = document.getElementById('buttonSendMessage');

    botonEnviar.addEventListener('click', () => {
    if (inputEmail.value && messageInput.value && inputFirstName.value) {
        const message = { 
            author: {
                email: inputEmail.value,
                name: inputFirstName.value,
                lastName:inputLastName.value,
                age: userAge.value,
                alias: userAlias.value,
                avatar: userAvatar.value
            },
            text: messageInput.value
            }
            socket.emit('newMessage', message);
            messageInput.value = '';
        }
    });

    //Recibir mensajes y añadirlos al front
    // socket.on('allMessages', (msgs)=> {
    //     msgs.forEach( msg => {
    //         let item = document.createElement('li');
    //         item.innerHTML = `<span class="badge bg-dark">${msg.username}</span> <span>${msg.date}</span>: <span>${msg.msg}</span>`;
    //         messages.appendChild(item);
    //     });
    // });

    socket.on('newMessage', (msg)=> {
        let item = document.createElement('li');
        item.innerHTML = `<span class="badge bg-dark">${msg.username}</span> <span>${msg.date}</span>: <span>${msg.msg}</span>`;
        messages.appendChild(item);
    });
}