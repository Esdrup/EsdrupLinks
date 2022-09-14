module.exports = {
    isLoggedIn(req,res,next){
        const verify = req.isAuthenticated()?next():res.redirect('/signin')
        return verify
    },

    isLoggedOut(req,res,next){
        const verify = req.isAuthenticated()?res.redirect('/links'):next()
        return verify
    }
}