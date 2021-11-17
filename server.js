const express = require(`express`)
const fs = require(`fs`)
const WebSocket = require(`ws`)
const app = express()
const { createHash } = require('crypto')
const path = require('path')

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
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
    console.log('Server running on port 8000....')
})

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.use(express.static('./public'))

app.all('*', (req, res) => {
	res.status(404).end(`<h1>Not Found</h1>`)
})

const wss = new WebSocket.Server({port:8080})

wss.on(`connection`, (ws) => {
    console.log(`Join: ${ws.id}`)
    
    ws.on(`message`, (message) => {
        const msg = JSON.parse(message)
        if(msg.type === 'login'){
            // console.log(`Email: ${msg.email} \nPassword: ${msg.password}`)
            connection.query(`SELECT password FROM ${msg.userType} WHERE email_id = '${msg.email}'`, function (err, rows, fields) {
                const myHash = createHash('sha256').update(msg.password).digest('hex');
                if (rows[0] && rows[0]['password'] === myHash){

                    console.log("Successful")
                }
                else {
                    console.log("Unsuccessful")
                }
          })
        }
        else if (msg.type === 'SignUp'){
            // console.log(`Name: ${msg.name} \nuserType:${msg.userType} \nEmail: ${msg.email} \nPassword: ${msg.password} \ncity: ${msg.city} \narea: ${msg.area} \nstreet_num: ${msg.streetNum} \nBuilding: ${msg.buildingNum} \nBank Account: ${msg.bankAcc}`)
            const myHash = createHash('sha256').update(msg.password).digest('hex');
            if(msg.userType === 'vendor'){
                connection.query(`INSERT INTO vendor VALUES (NULL, '${msg.name}', '${msg.city}', '${msg.area}', '${msg.streetNum}', '${msg.buildingNum}', '${msg.email}', '${myHash}', '${msg.bankAcc}' , NULL, NULL)`, function (err, fields) {
                    if(err){
                        console.log(`Constraint violated`)
                    }
                });
            }
        }
    })
})