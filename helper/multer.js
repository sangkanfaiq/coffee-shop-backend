const multer = require("multer");
const path = require('path')


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/products/");
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = "product-"+Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, value) => { // file validation
  const ext = path.extname(file.originalname)
  if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return value(new Error('Only images are allowed'))
  }
  value(null, true)
}
const maxSize = { // limit size image
  fileSize: 1 * 1000 * 1000 // in bytes = 1.000.000 bytes = 1 mb
}
const uploadProducts = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: maxSize
}).single('cover')

const upload = (req, res, next) => {
  uploadProducts(req, res, (err) => {
    if(err instanceof multer.MulterError){
      return res.json({
        success: false,
        message: err.message
      })
    } else if(err){
      return res.json({
        success: false,
        message: "File is not an image"
      })
    }
    next()
  })
}

module.exports = upload;
