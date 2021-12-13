const mysql = require('mysql');

// promised version of connection.query
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'bcceaf1505cc27',
    password: '8cd168c4',
    database: 'heroku_58f5d7af6c54d22'
})

const query = (queryString, args) => {
    return new Promise((resolve, reject) => {
        connection.query(queryString, args, (err, rows, fields) => {
            if(err){
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports = {query, connection}