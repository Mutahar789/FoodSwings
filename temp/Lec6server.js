const http = require(`http`)
const fs = require(`fs`)
const WebSocket = require(`ws`)


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

const server = http.createServer(async (req, resp) => {
    if(req.url === "/client.js"){
        const fileContents = await readFile(`client.js`)
        resp.end(fileContents)
    } else {
        const fileContents = await readFile(`client.html`)
        resp.end(fileContents)
    }
})

const wss = new WebSocket.Server({port:8080})

wss.on(`connection`, (ws) => {
    console.log(`Join: ${ws.id}`)
    
    ws.on(`message`, (message) => {
        const msg = JSON.parse(message)
        console.log(`Username: ${msg.uname} \nPassword: ${msg.password}`)
    })

})

server.listen(8000)