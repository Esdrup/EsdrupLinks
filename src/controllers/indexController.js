const controllerIndex = {}

controllerIndex.main = (req, res) =>{
    res.render('index') 
}

controllerIndex.aboutme = (req,res) =>{
    res.render('aboutme')
}
controllerIndex.faqs = (req,res) =>{
    res.render('faqs')
}

module.exports = controllerIndex