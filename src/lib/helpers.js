const bycrpt = require('bcryptjs')
const helpers = {}

helpers.encryptPassword = async (passwordUser) => {
    try {
        const salt = await bycrpt.genSalt(10)
        const hash = await bycrpt.hash(passwordUser, salt)
        return hash
    } catch (e) {
        console.log(e);
    }
}

helpers.dencryptPassword = async (passwordUser,savedPassword)=>{
    try {
        return await bycrpt.compare(passwordUser,savedPassword);
    } catch (e) {
        console.log(e);
    }
}

module.exports = helpers