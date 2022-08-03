const express = require("express")
const {getAllProducts, addNewProducts, updateProducts, deleteProducts} = require('../controller/productController')
const router = express.Router()
const upload = require('../helper/multer')

router.get('/', getAllProducts)
router.post('/', upload, addNewProducts)
router.patch('/:product_id', upload, updateProducts)
router.delete('/:product_id', deleteProducts)


module.exports = router