const express = require(`express`)
const fs = require(`fs`)
const app = express()
const { createHash } = require('crypto')
const path = require('path')
const cors = require('cors');
app.use(cors());
app.use(express.json()); 

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

app.post('/login', (req, res) => {
    connection.query(`SELECT password FROM ${req.body.userType} WHERE email_id = '${req.body.email}'`, function (err, rows, fields) {
        const myHash = createHash('sha256').update(req.body.password).digest('hex');
        if (rows[0] && rows[0]['password'] === myHash){

            console.log("Successful")
        }
        else {
            console.log("Unsuccessful")
        }
    })
})

app.post('/signup', (req, res) => {
    const myHash = createHash('sha256').update(req.body.password).digest('hex');
    if(req.body.userType === 'vendor'){
        connection.query(`INSERT INTO vendor VALUES (NULL, '${req.body.name}', '${req.body.city}', '${req.body.area}', '${req.body.streetNum}', '${req.body.buildingNum}', '${req.body.email}', '${myHash}', '${req.body.bankAcc}' , NULL, NULL)`, function (err, fields) {
            if(err){
                console.log(`Constraint violated`)
            }else{
                console.log('Success')
            }
        });
    }
    else if(req.body.userType === 'consumer'){
        connection.query(`INSERT INTO consumer VALUES (NULL, '${req.body.firstName}', '${req.body.middleName}', '${req.body.lastName}', '${req.body.city}', '${req.body.area}', '${req.body.streetNum}', '${req.body.buildingNum}', '${req.body.phoneNum}' , 0, '${req.body.email}', '${myHash}', '${req.body.gender}')`, function (err, fields) {
            if(err){
                console.log(`Constraint violated`)
            } else{
                console.log('Success')
            }
        });
    }
    else if(req.body.userType === 'rider'){
        connection.query(`INSERT INTO rider VALUES (NULL, '${req.body.firstName}', '${req.body.middleName}', '${req.body.lastName}', '${req.body.city}', '${req.body.area}', '${req.body.streetNum}', '${req.body.buildingNum}', '${req.body.vehicleType}', '${req.body.vehicleReg}', '${req.body.phoneNum}', '${req.body.email}', '${myHash}', '${req.body.gender}', '${req.body.bankAcc}', NULL)`, function (err, fields) {
            if(err){
                console.log(`Constraint violated`)
            } else{
                console.log('Success')
            }
        });
    }

}) 

// const wss = new WebSocket.Server({port:8080})

// wss.on(`connection`, (ws) => {
//     console.log(`Join: ${ws.id}`)
    
//     ws.on(`message`, (message) => {
//         const req.body = JSON.parse(message)
//         if(msg.type === 'login'){
//             // console.log(`Email: ${msg.email} \nPassword: ${msg.password}`)
//             connection.query(`SELECT password FROM ${msg.userType} WHERE email_id = '${msg.email}'`, function (err, rows, fields) {
//                 const myHash = createHash('sha256').update(msg.password).digest('hex');
//                 if (rows[0] && rows[0]['password'] === myHash){

//                     console.log("Successful")
//                 }
//                 else {
//                     console.log("Unsuccessful")
//                 }
//           })
//         }
//         else if (msg.type === 'SignUp'){
//             // console.log(`Name: ${msg.name} \nuserType:${msg.userType} \nEmail: ${msg.email} \nPassword: ${msg.password} \ncity: ${msg.city} \narea: ${msg.area} \nstreet_num: ${msg.streetNum} \nBuilding: ${msg.buildingNum} \nBank Account: ${msg.bankAcc}`)
//             const myHash = createHash('sha256').update(msg.password).digest('hex');
//             if(msg.userType === 'vendor'){
//                 connection.query(`INSERT INTO vendor VALUES (NULL, '${msg.name}', '${msg.city}', '${msg.area}', '${msg.streetNum}', '${msg.buildingNum}', '${msg.email}', '${myHash}', '${msg.bankAcc}' , NULL, NULL)`, function (err, fields) {
//                     if(err){
//                         console.log(`Constraint violated`)
//                     }
//                 });
//             }
//             if(msg.userType === 'consumer'){
//                 connection.query(`INSERT INTO consumer VALUES (NULL, '${msg.firstName}', '${msg.middleName}', '${msg.lastName}', '${msg.city}', '${msg.area}', '${msg.streetNum}', '${msg.buildingNum}', '${msg.phoneNum}' , 0, '${msg.email}', '${myHash}', '${msg.gender}')`, function (err, fields) {
//                     if(err){
//                         console.log(`Constraint violated`)
//                     }
//                 });
//             }
//             if(msg.userType === 'rider'){
//                 connection.query(`INSERT INTO rider VALUES (NULL, '${msg.firstName}', '${msg.middleName}', '${msg.lastName}', '${msg.city}', '${msg.area}', '${msg.streetNum}', '${msg.buildingNum}', '${msg.vehicleType}', '${msg.vehicleReg}', '${msg.phoneNum}', '${msg.email}', '${myHash}', '${msg.gender}', '${msg.bankAcc}', NULL)`, function (err, fields) {
//                     if(err){
//                         console.log(`Constraint violated`)
//                     }
//                 });
//             }
//         }
        
//     })
// })