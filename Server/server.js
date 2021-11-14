const express = require(`express`)
const fs = require(`fs`)
const WebSocket = require(`ws`)
const app = express()
const { createHash } = require('crypto')

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'FoodSwingsDB'
})

connection.connect()

const readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (readErr, fileContents) => {
            if(readErr){
                reject(readErr)
            }
            else {
                resolve(fileContents)
            }
        })
    })
}

app.listen(8000, () => {
    console.log('Server running on port 8080....')
})

app.get('/client.js',  async (req, res) => {
	const fileContents = await readFile(`client.js`)
    res.end(fileContents)
})

app.all('*', async (req, res) => {
    const fileContents = await readFile(`client.html`)
    res.end(fileContents)
})

const wss = new WebSocket.Server({port:8080})

wss.on(`connection`, (ws) => {
    console.log(`Join: ${ws.id}`)
    
    ws.on(`message`, (message) => {
        const msg = JSON.parse(message)
        if(msg.type === 'login'){
        console.log(`Username: ${msg.uname} \nPassword: ${msg.password}`)
        connection.query(`SELECT password FROM vendor WHERE email_id = '${msg.uname}'`, function (err, rows, fields) {
            const myHash = createHash('sha256').update(msg.password).digest('hex');
            if (rows[0] && rows[0]['password'] === myHash){
                console.log("Successful")
            }
            else {
                console.log("Unsuccessful")
            }
          })
        }
    })
})
