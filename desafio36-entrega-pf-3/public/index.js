import { isLoading } from "./loadingHelper.js";
const socket = io();
const urlPath = window.location.pathname;

//FRONT END EVENT LISTENERS
if (urlPath === "/login") {
  const username = document.getElementById("userNameLogIn");
  const password = document.getElementById("passwordlogin");
  const logInButton = document.getElementById("logInButton");
  const logInButtonFacebook = document.getElementById("logInButtonFacebook");

  logInButton.addEventListener("click", async (event) => {
    isLoading();
    event.preventDefault();
    try {
      const data = {
        email: username.value,
        password: password.value,
      };
      await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(data),
      }).then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("Network response was not OK");
        }
        if (res.redirected) {
          window.location.href = res.url;
        }
      });
    } catch (error) {
      console.trace(error);
    }
  });

  logInButtonFacebook.addEventListener("click", () => {
    isLoading();
  });
}

if (urlPath === "/logout") {
  setTimeout(() => (window.location.href = "/login"), 2500);
}

if (/\/(productos).*/.test(urlPath)) {
  // Add to cart event handler------------------------------------------//
  const productListContainer = document.getElementById("listaDeProductos");

  const addToCart = async (event) => {
    let carritoStorage = JSON.parse(localStorage.getItem("carrito"));

    if (event.target.innerText === "Agregar al carrito") {
      const data = {
        _id: event.target.attributes.productid.value,
      };
      if (carritoStorage === null || carritoStorage.length === 0) {
        console.log("POST");
        await fetch("/api/carrito/agregar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("carrito", JSON.stringify(data));
          });
      } else {
        console.log("PUT");
        carritoStorage.products.push(data);
        localStorage.setItem("carrito", JSON.stringify(carritoStorage));
        await fetch("/api/carrito/actualizar", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      }
    }
  };

  productListContainer.addEventListener("click", addToCart);
  // --------------------Filters event handlers ---------------------------------------------------------------//
  const filterContainer = document.getElementById("filters");

  const eventHandler = (event) => {
    if (event.target.id === "filterByNameBtn") {
      const inputValue = event.target.previousElementSibling.value;

      window.location.href = `/productos/name/${inputValue}`;
    }

    if (event.target.id === "filterByCodeBtn") {
      const inputValue = event.target.previousElementSibling.value;

      window.location.href = `/productos/code/${inputValue}`;
    }

    if (event.target.id === "filterByPriceBtn") {
      const inputMaxValue = event.target.previousElementSibling.value;
      let inputMinValue =
        event.target.previousElementSibling.previousElementSibling.value;
      inputMinValue === "" ? (inputMinValue = 0) : null;
      window.location.href = `/productos/price?min=${inputMinValue}&max=${inputMaxValue}`;
    }

    if (event.target.id === "filterByStockBtn") {
      const inputMaxValue = event.target.previousElementSibling.value;
      let inputMinValue =
        event.target.previousElementSibling.previousElementSibling.value;
      inputMinValue === "" ? (inputMinValue = 0) : null;
      window.location.href = `/productos/stock?min=${inputMinValue}&max=${inputMaxValue}`;
    }
  };
  filterContainer.addEventListener("click", eventHandler);
}
// WEBSOCKET ----------------------------------------------------------------------------------------------//

// Add new product to the table
socket.on("newProduct", (product) => {
  let productListContainer = document.getElementById("productList");

  productListContainer.appendChild = `
            <div class="col">
                    <div class="card h-100">
                    <img src="${product.imageURL}" class="card-img-top" alt="${product.description}">
                    <div class="card-body">
                        <p class="mb-0">
                            Codigo <span class="badge bg-secondary">${product.code} </span>
                        </p>
                        <h5 class="card-title mt-2">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="row justify-content-between">
                            <div class="col">
                                <p class="mb-0">
                                    Precio 
                                </p>
                                <span class="badge bg-info">${product.price} </span>
                            </div>
                            <div class="col">
                                <p class="mb-0">
                                    Stock
                                </p>
                                <span class="badge bg-danger">
                                ${product.stock}
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <button class="btn btn-primary" productId="${product._id}">
                            Agregar al carrito
                        </button>
                    </div>
                    </div>
                </div>
        `;
});

// ---------------------------------------------------
//Chat
if (/\/(productos)|(perfil)|(carrito).*/.test(urlPath)) {
  let messages = document.getElementById("messagesContainer");
  let inputEmail = document.getElementById("emailChat");
  let inputFirstName = document.getElementById("firstName");
  let inputLastName = document.getElementById("lastName");
  let userAge = document.getElementById("userAge");
  let userAvatar = document.getElementById("userAvatar").src;
  let messageInput = document.getElementById("messageChat");
  let botonEnviar = document.getElementById("buttonSendMessage");

  botonEnviar.addEventListener("click", async () => {
    if (messageInput.value) {
      const message = {
        author: {
          email: inputEmail.innerText,
          firstName: inputFirstName.innerText,
          lastName: inputLastName.innerText,
          age: userAge.innerText || null,
          avatar: userAvatar,
        },
        text: messageInput.value,
      };

      let messageText = messageInput.value;
      if (messageText.includes("administrador")) {
        console.log("post init");
        const data = {
          email: inputEmail.value,
          message: messageInput.value,
        };
        try {
          const response = await fetch("/send-sms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        } catch (error) {
          console.log(error);
        }
      }

      socket.emit("newMessage", message);
      messageInput.value = "";
    } else {
      alert("Añada un mesnaje");
    }
  });

  // Receive message and add them to the chat
  socket.on("allMessages", (msgs) => {
    msgs.forEach((msg) => {
      let item = document.createElement("div");
      item.innerHTML = `<img src="${msg.author.avatar}" class="rounded-circle" alt="Avatar del usuario"
            style="width: 45px; height: 45px;">
            <span class="badge bg-dark">${msg.author.firstName}</span>
          <div>
            <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${msg.text}</p>
            <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">${msg.date}</p></div>`;

      messages.appendChild(item);
    });
  });

  socket.on("newMessage", (msg) => {
    let item = document.createElement("div");
    item.innerHTML = `<img src="${msg.author.avatar}" class="rounded-circle" alt="Avatar del usuario"
            style="width: 45px; height: 45px;">
            <span class="badge bg-dark">${msg.author.firstName}</span>
          <div>
            <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${msg.text}</p>
            <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">${msg.date}</p></div>`;
    messages.appendChild(item);
  });

  // Cart methods
  const cartContainer = document.getElementById("cartContainer");

  const eventHandler = async (event) => {
    if (event.target.id === "removeAll") {
      await fetch("/api/carrito/borrar", {
        method: "DELETE",
      }).then((res) => (window.location.href = "/carrito"));
    }

    if (event.target.id === "checkOut") {
      const productosSorage = JSON.parse(localStorage.getItem("carrito"));
      await fetch("/api/carrito/checkout", {
        method: "POST",
        body: JSON.stringify(productosSorage),
      }).then((res) => (window.location.href = "/carrito"));
    }
  };

  cartContainer.addEventListener("click", eventHandler);
}

if (urlPath === "/agregar-productos") {
  // Event listener for sending new product

  let form = document.getElementById("form");

  let title = document.getElementById("nombreProducto");
  let price = document.getElementById("precioProducto");
  let thumbnail = document.getElementById("thumbnailURL");
  let description = document.getElementById("productDescription");
  let code = document.getElementById("productCode");
  let stock = document.getElementById("productStock");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      title.value &&
      price.value &&
      thumbnail.value &&
      description.value &&
      code.value &&
      stock.value
    ) {
      socket.emit("newProduct", {
        name: title.value,
        description: description.value,
        code: code.value,
        imageURL: thumbnail.value,
        price: price.value,
        stock: stock.value,
      });
      document.getElementById("alert").innerHTML =
        '<div class="alert alert-success alert-dismissible fade show" role="alert">Se creo correctamente el producto <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
      (document.getElementById("nombreProducto").value = ""),
        (document.getElementById("precioProducto").value = ""),
        (document.getElementById("thumbnailURL").value = "");
      document.getElementById("productDescription").value = "";
      document.getElementById("productCode").value = "";
      document.getElementById("productStock").value = "";
    }
  });
}
