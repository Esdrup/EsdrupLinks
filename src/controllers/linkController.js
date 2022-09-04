const controllerLink = {}
const pool = require('../database')

controllerLink.add = (req, res) => {
    res.render('links/add')
}

controllerLink.save = async (req, res) => {
    try {
        const data = req.body;
        data.USER_IDUSER=req.user.idUser
        await pool.query('insert into Link set ?', [data])
        req.flash('success', 'Link guardado correctamente')
        res.redirect('/links')
        
    } catch (e) {
        console.log(e);
    }
    
}

controllerLink.list = async (req, res) => {
    try {
        const rows = await pool.query('select * from link where USER_IDUSER = ?;',[req.user.idUser])
        res.render('links/list', {
            data: rows
        })
    } catch (e) {
        console.log(e);
    }
}

controllerLink.edit = async (req, res) => {
    try {
        const data = req.params
        const rows = await pool.query('select * from link where idLink = ?', [data.idLink])
        res.render('links/link_edit', {
            data: rows[0]
        })
    } catch (e) {
        console.log(e);
    }

}

controllerLink.update = async (req, res) => {
    try {
        const data = req.body
        const { idLink } = req.params
        await pool.query('update link set ? where idLink = ?', [data, idLink])
        req.flash('success', 'Link editado correctamente')
        res.redirect('/links')
    } catch (e) {
        console.log(e);
    }
}

controllerLink.delete = async (req, res) => {
    try {
        const { idLink } = req.params
        await pool.query('delete from link where idLink = ?', [idLink])
        req.flash('success', 'Link elimido correctamente')
        res.redirect('/links')
    } catch (e) {
        console.log(e);
    }
    
}

module.exports = controllerLink