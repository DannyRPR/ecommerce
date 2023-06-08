const { getAll, create, getOne, remove, update, setProductImgs, } = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(create);

productRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

productRouter.route('/:id/images')
    .post( verifyJWT,setProductImgs)


module.exports = productRouter;