require('dotenv').config()
module.exports = {
    database:{
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        
    }
}

//EN TU LOCALHOST
// module.exports = {
//     database:{
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'links',
        
//     }
// }