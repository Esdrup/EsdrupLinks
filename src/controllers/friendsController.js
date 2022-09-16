const controllerFriends = {}


controllerFriends.friends = (req,res)=>{
    res.render('friends/friends')
}

controllerFriends.solicitudes = (req,res)=>{
    res.render('friends/solicitudes')
}


module.exports = controllerFriends