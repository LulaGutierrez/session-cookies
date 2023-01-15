module.exports = {
    logueado: (req, res) => {
       // res.render('index')
        if (req.session.userLogin) {
            return res.render('logueado', {user:req.session.userLogin})
        }
        return res.redirect('/')
    },

    logout: (req,res) => {
        res.render('logout')
    }
}