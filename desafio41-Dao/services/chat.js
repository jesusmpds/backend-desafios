const { chatRepository } = require("../dal/repository/index");

exports.getAllMessages = async () => {
  try {
    return chatRepository.getAllMessages();
  } catch (error) {
    console.log(error);
  }
};

exports.saveMessage = async (message) => {
  try {
    const newMessage = await chatRepository.saveMessage(message);
    return newMessage;
  } catch (error) {
    console.log(error);
  }
};
// exports.editMessage = async (id, messageUpdated) => {
//   try {
//     const messageToUpdate = await Message.editMessage(id, messageUpdated, {
//       new: true,
//     });
//     return messageToUpdate;
//   } catch (error) {
//     console.log(error);
//   }
// };
// exports.deleteMessage = async (id) => {
//   try {
//     await Message.deleteMessage(id);
//   } catch (error) {
//     console.log(error);
//   }
// };
