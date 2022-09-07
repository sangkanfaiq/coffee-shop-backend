const express = require("express")
const {getAllProducts, addNewProducts, updateProducts, deleteProducts, getProductById} = require('../controller/productController')
const router = express.Router()
const upload = require('../helper/multer')

router.get('/', getAllProducts)
router.get('/:product_id', getProductById)
router.post('/', upload, addNewProducts)
router.patch('/:product_id', upload, updateProducts)
router.delete('/:product_id', deleteProducts)


module.exports = router