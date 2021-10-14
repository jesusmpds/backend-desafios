exports.logIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("Usuario logueado")
        const loggedUsername = req.user
        return res.redirect('/productos')
        
    } else {
        console.log('Usuario no logueado')
        res.render('partials/logIn')
        return
    }
}

exports.logOut = (req,res,next) => {
    try {
        console.log('Ingresó a Logout');
        req.logout();
        res.render('partials/logOut')
    } catch (error) {
        console.log(error)
    }
}

exports.signUp = (req,res,next) =>{
    res.render('partials/signUp')
}

exports.failureSignUp = (req,res,next)=> res.render('partials/failureSignUp')

exports.failureLogIn = (req,res,next)=> res.render('partials/failureLogIn')