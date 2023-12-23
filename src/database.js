const mysql2 = require('mysql2')
const {promisify} = require('util')
const {database} = require('./keys')

const pool = mysql2.createPool(database)

pool.getConnection((err,conn)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.err('DATABASE CONNECTION WAS CLOSED')
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.err('DATABASE HAS TO MANY CONNECTIONS')
        }
        if(err.code==='ECONNREFUSED'){
            console.err('DATABASE CONNECTION WAS REFUSED')
        }
    }
    if(conn){
        conn.release()
        console.log('DB IS CONNECT');
    }
    return
})

//CONVERTIDOR DE COL A PROMESAS
pool.query = promisify(pool.query)

module.exports = pool