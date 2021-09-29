exports.logIn = async (req, res, next) => {
    if (!req.body.username) throw new Error("No es posible ingresar");
    try {
        const { username } = req.body;
        req.session.user = username;
        res.cookie('isRegistered', `${req.session.user}`, {maxAge: 60000});
        console.log("Te has autenticado con éxito");
        res.redirect('/productos')
    } catch (error) {
        console.log(error)
    }
}

exports.logOut = (req,res,next) => {
    try {
        console.log('Ingresó a Logout');
        res.redirect('/productos/logout')
        return
    } catch (error) {
        console.log(error)
    }
}