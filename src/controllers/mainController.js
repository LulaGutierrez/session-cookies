const {loadUsers,saveUser} = require('../data/dbModules');
const color = require('../data/color');
const {validationResult} = require ('express-validator');

module.exports={
    index: (req, res) => {
        res.render('index', {color});
    },
    misc: (req, res) => {
        const errors = validationResult(req);
        const {nombre,email,color,guardarColor} = req.body;
        const users = loadUsers();

        if (errors.isEmpty()){
            const newUser = {
                id: users[users.length - 1] ? users[users.length-1].id + 1 : 1,
                nombre: nombre.trim(),
                email : email.trim(),
                color : color,
                guardarColor
            }
            const usersModify = [...users,newUser];
            saveUser(usersModify);
            
            req.session.userLogin = {
                id: users.id,
                nombre,
                email,
                color,
                guardarColor
            }

            res.cookie('userLogin',req.session.userLogin,{maxAge: 2000 * 60})
            if(req.body.guardarColor){
                res.cookie('userYaEsMuyTarde', req.session.userLogin, {maxAge: 8000 * 60})
            } res.redirect('/logueado');


        } else {
            return res.render('index',{
                errors : errors.mapped(),
                old : req.body
            })
          }
    },
 
    destroy: (req, res) => {
        req.session.destroy();
        res.cookie('userLogin', null, {maxAge:-1})
        res.redirect('logout')
    }
}