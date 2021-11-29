const express = require(`express`)
const fs = require(`fs`)
const app = express()
const { createHash } = require('crypto')
const path = require('path')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 3001;
const secretStr = "FoodSwings-Database2021-secretString-35855459"

var mysql = require('mysql');
const e = require('express')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'FoodSwingsDB'
})

let cart = {}

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

const createToken = (id) => {
    return jwt.sign({id}, secretStr)
}

const authenticateConsumer = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, secretStr, (err, decodedToken) => {
            const tokenData = decodedToken.id.split("|");
            const userType = tokenData[1]
            const email = tokenData[0]

            if(userType === "consumer"){
                res.email = email;
                next();
            } else {
                res.status(200).json({
                    err: "Not logged in as a consumer"
                })
            }
        })
    }
    else{
        console.log("/browse unathorized")
        res.status(200).send(JSON.stringify({
            err: "Unauthorized"
        }))
    }
}
const authenticateVendor = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, secretStr, (err, decodedToken) => {
            const tokenData = decodedToken.id.split("|");
            const userType = tokenData[1]
            const email = tokenData[0]

            if(userType === "vendor"){
                res.email = email;
                next();
            } else {
                res.status(200).json({
                    err: "Not logged in as a vendor"
                })
            }
        })
    }
    else{
        console.log("/browse unathorized")
        res.status(200).send(JSON.stringify({
            err: "Unauthorized"
        }))
    }
}
const authenticateRider = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, secretStr, (err, decodedToken) => {
            const tokenData = decodedToken.id.split("|");
            const userType = tokenData[1]
            const email = tokenData[0]

            if(userType === "rider"){
                res.email = email;
                next();
            } else {
                res.status(200).json({
                    err: "Not logged in as a rider"
                })
            }
        })
    }
    else{
        console.log("/browse unathorized")
        res.status(200).send(JSON.stringify({
            err: "Unauthorized"
        }))
    }
}

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }));



app.post('/login', (req, res) => {
    connection.query(`SELECT password FROM ${req.body.userType} WHERE email_id = '${req.body.email}'`, function (err, rows, fields) {
        const myHash = createHash('sha256').update(req.body.password).digest('hex');
        if (rows[0] && rows[0]['password'] === myHash){

            console.log("Successful login")
            const token = createToken(req.body.email+"|"+req.body.userType);
            res.cookie("jwt", token);
            let redirect = ""
            if(req.body.userType === "consumer" ){
                redirect="/browse"
            } else {
                redirect = "/" + req.body.userType + "Home"
            }
            res.status(200).json({
                redirect: redirect
            })
        }
        else {
            console.log("Unsuccessful login")
            res.status(200).send(JSON.stringify({
                err: "Username or password is incorrect"
            }))
        }
    })
})

app.post('/signup', (req, res) => {
    const myHash = createHash('sha256').update(req.body.password).digest('hex');
    let success = 0
    let error = ""
    let redirect = ""
    if(req.body.userType === 'vendor'){
        connection.query(`INSERT INTO vendor VALUES (NULL, '${req.body.name}', '${req.body.city}', '${req.body.area}', '${req.body.streetNum}', '${req.body.buildingNum}', '${req.body.email}', '${myHash}', '${req.body.bankAcc}' , NULL, NULL)`, function (err, fields) {
            if(err){
                error = err
                console.log(`Unsuccessful signup`)
            }else{
                redirect = "/vendorHome"
                success = 1
                console.log('Signup Successful')
            }
            if(success ===  1){
                // data base updated
                console.log('Successful signup')
                // instant login
                const token = createToken(req.body.email+"|"+req.body.userType);
                res.cookie('jwt', token, {httpOnly: true});
                res.status(200).send(JSON.stringify({
                    redirect: redirect
                }))
            } else {
                console.log(`Constraint violated`)
                // error = handleError(err)
                res.status(200).send(JSON.stringify({
                    err: "error"
                }))
            }
        });
    }
    else if(req.body.userType === 'consumer'){
        connection.query(`INSERT INTO consumer VALUES (NULL, '${req.body.firstName}', '${req.body.middleName}', '${req.body.lastName}', '${req.body.city}', '${req.body.area}', '${req.body.streetNum}', '${req.body.buildingNum}', '${req.body.phoneNum}' , 0, '${req.body.email}', '${myHash}', '${req.body.gender}')`, function (err, fields) {
            if(err){
                error = err
                console.log(`Unsuccessful Signup`)
            } else{
                redirect = "/browse"
                success = 1
                console.log('Signup Successful')
            }
            if(success ===  1){
                // data base updated
                console.log('Successful signup')
                // instant login
                const token = createToken(req.body.email+"|"+req.body.userType);
                res.cookie('jwt', token, {httpOnly: true});
                res.status(200).send(JSON.stringify({
                    redirect: redirect
                }))
            } else {
                console.log(`Constraint violated`)
                // error = handleError(err)
                res.status(200).send(JSON.stringify({
                    err: "error"
                }))
            }
        });
    }
    else if(req.body.userType === 'rider'){
        connection.query(`INSERT INTO rider VALUES (NULL, '${req.body.firstName}', '${req.body.middleName}', '${req.body.lastName}', '${req.body.city}', '${req.body.area}', '${req.body.streetNum}', '${req.body.buildingNum}', '${req.body.vehicleType}', '${req.body.vehicleReg}', '${req.body.phoneNum}', '${req.body.email}', '${myHash}', '${req.body.gender}', '${req.body.bankAcc}', NULL)`, function (err, fields) {
            if(err){
                error = err
                console.log(`Unsuccessful Signup`)
            } else{
                redirect = "/riderHome"
                success = 1
                console.log('Signup Successful')
            }
            if(success ===  1){
                // data base updated
                console.log('Successful signup')
                // instant login
                const token = createToken(req.body.email+"|"+req.body.userType);
                
                // res.cookie('jwt', token, {httpOnly: true});
                res.setHeader('Set-Cookie', `jwt=${token}`)

                res.status(200).send(JSON.stringify({
                    redirect: redirect
                }))
            } else {
                console.log(`Constraint violated`)
                // error = handleError(err)
                res.status(200).send(JSON.stringify({
                    err: "error"
                }))
            }
        });
    }
}) 

app.get('/browseVendors', (authenticateConsumer), (req, res) => {
    
    // TODO:
    // update database to add area and city table
    // update delivery radius to add multiple radius for each vendor
    // add area filter to display only selective restaurants to user | for now all vendors displayed

    // TODO:
    // Update rest of sql queries to this placeholder synatx to prevent sql injection
    console.log("finding restaurants....")
    connection.query(`SELECT id, name, image_url, rating  FROM vendor`, {
        email: res.email
    }, function (err, rows, fields) {
        res.status(200).json({
            vendors: rows
        })
    })
})

app.get('/menu', (authenticateConsumer), (req, res) => {

    console.log("getting menu....")
    connection.query(`SELECT id, name, image_url, price, description  FROM item`, function (err, rows, fields) {
        res.status(200).json({
            items: rows
        })
    })
})

app.post('/addToCart', (authenticateConsumer), (req, res) => {

    console.log("added to cart....");
    // TODO: Delete when use logs out or places order
    
    const item = [req.body.id, req.body.name] 
    console.log(item)
    cart[res.email] = cart[res.email] || {}
    if(cart[res.email][item]){
        cart[res.email][item] += 1
    } else{
        cart[res.email][item] = 1
    }
    console.log(cart)
    res.status(200).send('')
})

app.get("/shoppingCart", (authenticateConsumer), (req, res) => {
    
    let items = []
    if(cart[res.email]){
        console.log("Sending cart items")
        count = Object.keys(cart[res.email]).length;
        Object.entries(cart[res.email]).map(([k, v]) => {
            const key = k.split(",")
            const id = key[0]
            const name = key[1]
            connection.query(`SELECT price FROM item WHERE id = ? AND name = ?`, [id, name], function (err, rows, fields) {
                const item = {
                    id : id,
                    name: name,
                    price: rows[0]["price"],
                    qty: v
                }
                items.push(item)
                if(--count === 0 ){
                    res.status(200).json({
                        items: items
                    })
                }
            })
        })
    } else {
        console.log("Empty cart")
        res.status(200).json({
            err: "Cart is empty"
        })
    }
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}....`)
})

