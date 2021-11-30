const cartService = require("../services/cartService");

const { sendSMS, sendWhatsApp } = require("../services/twilioService");
const { gmailSendMail } = require("../controller/emailController");
const logger = require("../services/loggerService");

exports.getCartByUserId = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const shoppingCart = await cartService.getAllCartItems(_id);
    return shoppingCart;
  } catch (error) {
    logger.error(error);
  }
};

exports.addShoppingCartByUserId = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const product = req.body;
    const shoppingCartCreated = await cartService.addCart({
      user: _id,
      products: product,
    });
    res.send(shoppingCartCreated);
  } catch (error) {
    logger.error(error);
  }
};

exports.updateorCreateShoppingCartByUserId = async (req, res, next) => {
  const { _id } = req.user;
  const products = req.body;
  console.log(products);
  const shoppingCartUpdated = await cartService.updateCart(_id, products);
  res.send(shoppingCartUpdated);
};

exports.deleteShoppingCartByUserId = async (req, res, next) => {
  const { _id } = req.user;
  const deleted = await cartService.deleteCart(_id);
  res.send(deleted);
};

exports.checkout = async (req, res) => {
  const { _id, name, email, phone } = req.user;

  const shoppingCart = await cartService.getAllCartItems(_id);

  const emailContent = `<h1>pedido de ${name}</h1><br/>
                        ${shoppingCart.products.map(
                          ({ nombre }) => `${nombre}<br/>`
                        )}`;
  let whatsappContent = `_orden de ${name} - ${phone}_
  `;
  whatsappContent += shoppingCart.products.map(
    ({ codigo, nombre }) => `-${nombre}[${codigo}]
  `
  );
  await sendWhatsApp(whatsappContent);
  await gmailSendMail(emailContent);

  const deleted = await cartService.deleteCart(_id);
  res.send(deleted);
};
