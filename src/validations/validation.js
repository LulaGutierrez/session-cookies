const {check, body} = require ('express-validator');
const {loadUsers} = require ('../data/dbModules');

module.exports = [
    check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min:2,
            max:25
        }).withMessage('Ingresar entre 2 y 25 caracteres').bail()
        .isAlpha('es-ES').withMessage('Solo caracteres alfabeticos'),

    body('email')
        .notEmpty().withMessage('El mail es obligatorio').bail()
        .isEmail().withMessage('Ingresá un mail valido')
        .custom((value,{req})=> {
            const user = loadUsers().find(user => user.email === value)
            if (user){
                return false
            } else {
                return true
            }
        }).withMessage('El mail ya está registrado')
  ]