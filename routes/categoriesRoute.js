const express = require("express")
const {getAllCategories, addNewCategories, updateCategories, deleteCategories} = require('../controller/categoriesController')
const router = express.Router()

router.get('/', getAllCategories)
router.post('/', addNewCategories)
router.patch('/:category_id', updateCategories)
router.delete('/:category_id', deleteCategories)


module.exports = router