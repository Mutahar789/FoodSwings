const jwt = require('jsonwebtoken')
const secretStr = "FoodSwings-Database2021-secretString-35855459"

const createToken = (id) => {
    // 30 minute session
    return jwt.sign({id}, secretStr, {expiresIn: 1800})
}

const verify = (token, secretStr) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretStr, (err, decodedToken) => {
            if(err){
                reject()
            } else {
                resolve(decodedToken)
            }
        })
    })
}

const authenticateConsumer = async (req, res, next) => {
    try{
        const token = req.cookies.jwt
        const decodedToken = await verify(token, secretStr)
        const tokenData = decodedToken.id.split("|");
        const userType = tokenData[1]
        const email = tokenData[0]

        if(userType === "consumer"){
            res.email = email;
            next();
        } else {
            res.status(401).send()
        }
    }
    catch{
        res.status(401).send()
    }
}

const authenticateVendor = async (req, res, next) => {
    try{
        const token = req.cookies.jwt
        const decodedToken = await verify(token, secretStr)
        const tokenData = decodedToken.id.split("|");
        const userType = tokenData[1]
        const email = tokenData[0]

        if(userType === "vendor"){
            res.email = email;
            next();
        } else {
            res.status(401).send()
        }
    }
    catch{
        res.status(401).send()
    }
}

const authenticateRider = async (req, res, next) => {
    try{
        const token = req.cookies.jwt
        const decodedToken = await verify(token, secretStr)
        const tokenData = decodedToken.id.split("|");
        const userType = tokenData[1]
        const email = tokenData[0]

        if(userType === "rider"){
            res.email = email;
            next();
        } else {
            res.status(401).send()
        }
    }
    catch{
        res.status(401).send()
    }
}

module.exports = {createToken, authenticateConsumer, authenticateVendor, authenticateRider};