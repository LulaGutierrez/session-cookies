var express = require('express');
var router = express.Router();
const {index, misc, destroy} = require ('../controllers/mainController')
const {logueado, logout} = require ('../controllers/userController')
const validaciones = require ('../validations/validation')

router
  .get('/', index)  
  .post('/', validaciones, misc)
  .get('/logueado', logueado)
  .get('/logout', logout)
  .get('/destroy',destroy)
 

module.exports = router;



