const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      let splitType = file.mimetype;
      let fileSplit = splitType.split('/')
      const fileType= fileSplit[1]
      const uniqueSuffix = Date.now()
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType)
    }
  })

module.exports = multer({ storage: storage })