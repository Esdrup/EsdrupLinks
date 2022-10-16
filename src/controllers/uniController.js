const controllerUni = {}
const pool = require('../database')


controllerUni.listUni = async (req, res) => {
    const rows = await pool.query('select * from course where USER_IDUSER=?', [req.user.idUser])
    res.render('uni/listUni', { course: rows })
}

controllerUni.course = (req, res) => {
    res.render('uni/course')
}

controllerUni.addcourse = async (req, res) => {
    const data = req.body
    data.USER_IDUSER = req.user.idUser
    await pool.query('insert into course set ?', [data])
    req.flash('success', 'Curso registrado correctamente')
    res.redirect('/uni')
}

controllerUni.deleteConfirm = async(req,res)=>{
    const rows=await pool.query('select * from course where idCourse=?',[req.params.id])
    res.render('uni/course_delete',{data:rows[0]})
}

controllerUni.delete = async (req, res) => {
    await pool.query('delete from course where idCourse=?', [req.params.id])
    req.flash('success','Curso eliminado correctamente')
    res.redirect('/uni')
}

controllerUni.edit = async (req, res) => {
    const rows = await pool.query('select * from course where idCourse=?', [req.params.id])
    res.render('uni/course_edit', { data: rows[0] })
}

controllerUni.update = async(req, res) => {
    const data = req.body
    await pool.query('update course set ? where idCourse = ?', [data, req.params.id])
    req.flash('success', 'Curso editado correctamente')
    res.redirect('/uni')
}

controllerUni.updatetitle = async(req,res)=>{
    console.log(req.body,"..............",req.params.id);

    await pool.query('update user set titleuniUser=? where idUser = ?',[req.body.titleuniUser,req.params.id])
    res.redirect('/uni')
}

module.exports = controllerUni