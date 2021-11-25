const mongoose = require('mongoose')
const {MONGO_URI} = require('../../config/globals')
const logger = require('../../services/loggerService')

exports.getConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        return "Connection Success"
    } catch (error) {
        logger.error(error)
        return "Connection Failed"
    }

  };