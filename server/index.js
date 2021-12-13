const express = require(`express`)
const fs = require(`fs`)
const app = express()
const { createHash } = require('crypto')
const path = require('path')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const {query, connection} = require('./util.js')
const {createToken, authenticateConsumer, authenticateVendor, authenticateRider} = require ('./auth.js');

const PORT = process.env.PORT || 3001;
connection.connect()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cookieParser());
app.use(cors({
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

let cart = {}
const userTypes = ["vendor", "consumer", "rider"]

app.post('/login', async (req, res) => {
    try{
        if(userTypes.includes(req.body.userType)){
            const rows = await query(`SELECT password FROM ${req.body.userType} WHERE email_id = ?`, [req.body.email]);
            const myHash = createHash('sha256').update(req.body.password).digest('hex');
            if (rows[0]['password'] === myHash){

                const token = createToken(req.body.email+"|"+req.body.userType);
                res.cookie("jwt", token, {httpOnly:true, sameSite: true});
                res.status(200).send()
            }
        }
    }
    catch {
        res.status(401).send()
    }
})

app.get('/consumer/browse', (authenticateConsumer), async (req, res) => {
    try{
        const locality = await query("SELECT city, area FROM consumer WHERE email_id = ?", [res.email])
        const city = locality[0]["city"]
        const area = locality[0]["area"]

        const vendors = await query(`SELECT id, name, image_url, rating  FROM vendor WHERE ID in (SELECT ID FROM delivery_radius WHERE city = ? AND area = ?)`, [city, area])
        res.status(200).json({
            vendors: vendors
        })
    } catch(err) {
        res.status(400).json({
            err: "Cart is empty. Add items to view cart."
        })
    }
})

app.post('/consumer/menu', (authenticateConsumer), async (req, res) => {
    try{
        const menu = await query(`SELECT id, name, category, image_url, price, description FROM item WHERE ID = ? ORDER BY category`, [req.body.id])
        delete cart[res.email]
        let categories = []
        let category = ""
        let items = {}
        menu.forEach((element) => {
            if(element.category != category){
                category = element.category
                categories.push(category)
                items[category] = []
            }
            items[category].push(element)
        })
        res.status(200).json({
            items: items,
            categories: categories
        })
    } catch {
        res.status(400).send()
    }
})

app.post('/consumer/addToCart', (authenticateConsumer), async (req, res) => {
    try {
        const locality = (await query("SELECT city, area FROM consumer WHERE email_id = ?", [res.email]))[0]
        const city = locality["city"]
        const area = locality["area"]
        const find = await query('SELECT id FROM delivery_radius WHERE id = ? AND city = ? AND area = ?', [parseInt(req.body.id), city, area])
        if(find.length!== 0){
            let vendor_ID = req.body.id
            if(cart[res.email]){
                vendor_ID = cart[res.email][0]
            }
            const rows = await query('SELECT * FROM item WHERE id = ? AND name = ?', [parseInt(req.body.id), req.body.name])
            if(rows.length !== 0 && vendor_ID===req.body.id){
                if(!cart[res.email]){
                    cart[res.email] = [vendor_ID, {}]
                }
                item = [req.body.name, rows[0]["price"]]

                if(cart[res.email][1][item])
                    cart[res.email][1][item] += 1
                else
                    cart[res.email][1][item] = 1

                res.status(200).send('')
            } else {
                res.status(400).send()
            }
        } else {
            res.status(400).send()
        }
    } catch {
        res.status(400).send()
    }
})

app.post('/consumer/removeFromCart', (authenticateConsumer), (req, res) => {
    try {
        const item = [req.body.name, req.body.price]
        delete cart[res.email][1][item]
        res.status(200).send()
    } catch {
        res.status(400).send()
    }
})

app.get("/consumer/cart", (authenticateConsumer), (req, res) => {
    try{
        let items = []
        const vendor_ID = cart[res.email][0]
        const count = Object.keys(cart[res.email][1]).length;
        if(count === 0){
            res.status(400).json({
                err: "Cart is empty. Add items to view cart."
            })
        } else {
            Object.entries(cart[res.email][1]).map(([k, qty]) => {
                const key = k.split(",")
                const name = key[0]
                const price = key[1]
                const item = {
                    id : vendor_ID,
                    name: name,
                    price: price,
                    qty: qty
                }
                items.push(item)
            })
            res.status(200).json({
                items: items
            })
        }
    } catch {
        res.status(400).json({
            err: "Cart is empty. Add items to view cart."
        })
    }
})

app.get("/consumer/orderHistory", (authenticateConsumer), async (req, res) => {
    try {
        const id = (await query('SELECT id FROM consumer WHERE email_id = ?', [res.email]))[0]["id"]
        const Orders = await query(`SELECT orders.id, vendor.name, orders.placed, orders.delivered, orders.value, orders.rating, orders.status FROM orders, vendor WHERE consumer_ID = ${id} AND orders.vendor_ID = vendor.id ORDER BY placed DESC`)
        res.status(200).json({
            orders: Orders
        })
    } catch {
        res.status(400).send()
    }
})

app.post("/consumer/orderDetails", (authenticateConsumer), async (req, res) => {
    try {
        const id = (await query('SELECT id FROM consumer WHERE email_id = ?', [res.email]))[0]["id"]
        const consumer_ID = (await query('SELECT consumer_ID FROM orders WHERE id=?', [req.body.id]))[0]["consumer_ID"]
        if(id === consumer_ID){
            const items = await query('SELECT name, quantity, price FROM ordered_item WHERE orders_ID = ?', [req.body.id])
            res.status(200).json({
                items: items
            })
        } else {
            res.status(401).send()
        }
    } catch {
        res.status(400).send()
    }
})

app.post("/getAreas", async (req, res) => {
    try{
        const city = req.body.city
        const rows = await query(`SELECT area FROM locality WHERE city = ?`, [city])
        res.status(200).json({
            areaList: rows
        })
    } catch {
        res.status(400).send()
    }
})

app.post('/signup', async (req, res) => {
    const myHash = createHash('sha256').update(req.body.password).digest('hex');
    new Promise(async (resolve, reject) => {
        if(req.body.userType === 'vendor'){
            try {
                await query(`INSERT INTO vendor VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)`, [req.body.name, req.body.city, req.body.area, parseInt(req.body.street), parseInt(req.body.building), req.body.email, myHash, req.body.bankAcc])
                const id = (await query(`SELECT id FROM vendor WHERE email_id = ?`, [req.body.email]))[0]["id"]
                // phone table entries
                const phones = [...new Set(req.body.phone)];
                let numOfPhones = phones.length;
                phones.map(async (p) => {
                    try{
                        await query(`INSERT INTO phone VALUES (?, ?)`, [p, id])
                        if(--numOfPhones === 0) {
                            // delivery radius table entries
                            const locations = [...new Set(req.body.deliveryLoc)];
                            let numOfLoc = locations.length;
                            locations.map(async (loc) => {
                                try {
                                    await query(`INSERT INTO delivery_radius VALUES (?, ?, ?)`, [id, req.body.city, loc])
                                    if(--numOfLoc === 0){
                                        resolve()
                                    }
                                } catch {
                                    await query('DELETE FROM vendor WHERE id = ?', [id])
                                    reject("Please select valid delivery radius.")
                                }
                            })
                        }
                    } catch {
                        await query('DELETE FROM vendor WHERE id = ?', [id])
                        reject("Incorrect format for phone number.")
                    }
                })
            }
            catch (err) {
                reject(err.sqlMessage)
            }
        }
        else if(req.body.userType === 'consumer'){
            try {
                await query(`INSERT INTO consumer VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.firstName, req.body.middleName, req.body.lastName, req.body.city, req.body.area, req.body.street, req.body.building, req.body.phone , 0, req.body.email, myHash, req.body.gender])
                const id = (await query(`SELECT id FROM consumer WHERE email_id = ?`, [req.body.email]))[0]["id"]
                // credit card table update
                let numOfCards = req.body.credit_cards.length;
                req.body.credit_cards.map(async (card, index) => {
                    try {
                        cvc = req.body.CVCs[index]
                        expMonth = req.body.expMonths[index]
                        expYear = req.body.expYears[index]
                        type = req.body.types[index]
                        await query(`INSERT INTO credit_card VALUES (?, ?, ?, ?, ?, ?)`, [card, id, cvc, parseInt(expMonth), parseInt(expYear), type])
                        if(--numOfCards === 0) {
                            resolve()
                        }
                    } catch {
                        await query('DELETE FROM consumer WHERE id = ?', [id])
                        reject("Invalid credit card information")
                    }
                })
            } catch(err) {
                reject(err.sqlMessage)
            }
        }
        else if(req.body.userType === 'rider'){
            try {
                await query(`INSERT INTO rider VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.firstName, req.body.middleName, req.body.lastName, req.body.city, req.body.area, req.body.street, req.body.building, req.body.vehicleType, req.body.vehicleReg, req.body.phone, req.body.email, myHash, req.body.gender, req.body.bankAcc, req.body.area])
                resolve()
            } catch(err) {
                reject(err.sqlMessage)
            }
        } else {
            reject()
        }
    })
    .then(() => {
        const token = createToken(req.body.email+"|"+req.body.userType);
        res.cookie('jwt', token, {httpOnly: true, sameSite: true});
        res.status(200).send()
    })
    .catch((err) => {
        res.status(400).send(err)
    })
}) 

app.get("/vendor/orderHistory", (authenticateVendor), async (req, res) => {
    try {
        const id = (await query('SELECT id FROM vendor WHERE email_id = ?', [res.email]))[0]["id"]
        const Orders = await query(`SELECT orders.id, concat(consumer.first_name,' ',consumer.last_name) as name, orders.placed, orders.delivered, orders.value, orders.rating, orders.status FROM orders, consumer WHERE orders.vendor_ID = ${id} AND orders.consumer_ID = consumer.id ORDER BY placed DESC`)
        res.status(200).json({
            orders: Orders
        })
    } catch {
        res.status(400).send()
    }
})

app.post("/vendor/orderDetails", (authenticateVendor), async (req, res) => {
    try {
        const id = (await query('SELECT id FROM vendor WHERE email_id = ?', [res.email]))[0]["id"]
        const vendor_ID = (await query('SELECT vendor_ID FROM orders WHERE id=?', [req.body.id]))[0]["vendor_ID"]
        if(vendor_ID === id){
            const items = await query('SELECT name, quantity, price FROM ordered_item WHERE orders_ID = ?', [req.body.id])
            res.status(200).json({
                items: items
            })
        } else {
            res.status(401).send()
        }
    } catch {
        res.status(400).send()
    }
})

app.get("/vendor/menu", (authenticateVendor), async (req, res) => {
    try{
        const rows = await query('SELECT id FROM vendor WHERE email_id = ?', [res.email])
        const id = rows[0]["id"]
        const menu = await query(`SELECT id, name, category, image_url, price, description FROM item WHERE ID = ? ORDER BY category`, [id])
        let categories = []
        let category = ""
        let items = {}
        menu.forEach((element) => {
            if(element.category != category){
                category = element.category
                categories.push(category)
                items[category] = []
            }
            items[category].push(element)
        })
        res.status(200).json({
            items: items,
            categories: categories
        })
    } catch {
        res.status(400).send()
    }
})

app.post("/vendor/removeItem", (authenticateVendor), async (req, res) => {
    try {
        const rows = await query('SELECT id FROM vendor WHERE email_id = ?', [res.email])
        const id = rows[0]["id"]
        await query('DELETE FROM item WHERE id = ? AND name = ?', [id, req.body.name])
        res.status(200).send() 
    } catch {
        res.status(400).send()
    }
})

app.post("/vendor/addItem", (authenticateVendor), async (req, res) => {
    try {
        const rows = await query('SELECT id FROM vendor WHERE email_id = ?', [res.email])
        const id = rows[0]["id"]
        if(req.body.description && req.body.image_url) {
            await query('INSERT INTO item VALUES (?, ?, ?, ?, ?, ?)', [id, req.body.name, parseInt(req.body.price), req.body.category, req.body.image_url, req.body.description])
        }
        else if (req.body.image_url) {
            await query('INSERT INTO item VALUES (?, ?, ?, ?, ?, NULL)', [id, req.body.name, parseInt(req.body.price), req.body.category, req.body.image_url])
        }
        else if (req.body.description) {
            await query('INSERT INTO item VALUES (?, ?, ?, ?, NULL, ?)', [id, req.body.name, parseInt(req.body.price), req.body.category, req.body.description])
        }
        else {
            await query('INSERT INTO item VALUES (?, ?, ?, ?, NULL, NULL)', [id, req.body.name, parseInt(req.body.price), req.body.category])   
        }
        res.status(200).send()
    } catch {
        res.status(400).send()
    }
})

app.get("/logout", (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.status(200).send()
})

app.get("/rider/orderHistory", (authenticateRider), async (req, res) => {
    try {
        const id = (await query('SELECT id FROM rider WHERE email_id = ?', [res.email]))[0]["id"]
        const Orders = await query(`SELECT orders.id, vendor.name as vendor_name, concat(consumer.first_name,' ',consumer.last_name) as consumer_name, placed, delivered, orders.value, orders.rating, orders.status FROM orders, consumer, vendor WHERE orders.rider_ID = ${id} AND orders.vendor_ID = vendor.id AND orders.consumer_ID = consumer.id ORDER BY placed DESC`)
        res.status(200).json({
            orders: Orders
        })
    } catch {
        res.status(400).send()
    }
})

app.get("/consumer/checkout", (authenticateConsumer), async (req, res) => {
    try {
        const consumer = (await query('SELECT id, wallet, city, area, street_num, building_num, phone_num FROM consumer WHERE email_id = ?', [res.email]))[0]
        const id = consumer["id"]
        const creditCards = await query('SELECT credit_card_num, type FROM credit_card WHERE id = ?', [id])
        res.status(200).json({
            wallet: consumer["wallet"],
            creditCards: creditCards,
            city: consumer["city"],
            area: consumer["area"],
            street_num: consumer["street_num"],
            building_num: consumer["building_num"],
            phone_num: consumer["phone_num"]
        })
    } catch {
        res.status(400).send()
    }
})

app.post("/consumer/placeOrder", (authenticateConsumer), async (req, res) => {
    let orders_ID = -1
    try{
        const consumer = (await query('SELECT id, wallet FROM consumer WHERE email_id = ?', [res.email]))[0]
        const count = Object.keys(cart[res.email][1]).length;
        if(count === 0){
            res.status(400).send()
        } else {
            const consumer_ID = consumer["id"]
            const wallet = consumer["wallet"]
            let orderValue = 0
            let items = []
            const vendor_ID = cart[res.email][0]
            Object.entries(cart[res.email][1]).map(([k, qty]) => {
                const key = k.split(",")
                const name = key[0]
                const price = key[1]
                const item = {
                    name: name,
                    price: price,
                    qty: qty
                }
                items.push(item)
                orderValue += qty*price
            })
            await query(`INSERT INTO orders VALUES(NULL, ?, ?, NULL, 'Placed', ?, NULL, now(), NULL)`, [parseInt(vendor_ID), consumer_ID,  orderValue])
            orders_ID = (await query('SELECT max(id) FROM orders'))[0]["max(id)"]
            if(req.body.usingWallet){
                const differentialAmount = orderValue-wallet
                const remaining = wallet-orderValue
                if(wallet>=orderValue){
                    await query('UPDATE consumer SET wallet=? WHERE id = ?', [remaining, consumer_ID])
                    await query("INSERT INTO transaction VALUES(NULL, ?, 'Wallet', NULL, ?)", [orders_ID, orderValue])
                } else {
                    await query('UPDATE consumer SET wallet=0 WHERE id = ?', [consumer_ID])
                    await query("INSERT INTO transaction VALUES(NULL, ?, 'Wallet', NULL, ?)", [orders_ID, wallet])
                    if(req.body.paymentMethod === "cash")
                        await query("INSERT INTO transaction VALUES(NULL, ?, 'Cash', NULL, ?)", [orders_ID, differentialAmount])
                    else {
                        const cardOwner_ID = (await query('SELECT id FROM credit_card where credit_card_num = ?', [req.body.card.credit_card_num]))[0]["id"]
                        if(cardOwner_ID === consumer_ID){
                            await query("INSERT INTO transaction VALUES(NULL, ?, 'Card', ?, ?)", [orders_ID, req.body.card.credit_card_num, differentialAmount])
                        } else {
                            throw "Invalid Credit Card";
                        }
                    }
                }
            } else if(req.body.paymentMethod === "cash") {
                await query("INSERT INTO transaction VALUES(NULL, ?, 'Cash', NULL, ?)", [orders_ID, orderValue])
            } else {
                const cardOwner_ID = (await query('SELECT id FROM credit_card WHERE credit_card_num = ?', [req.body.card.credit_card_num]))[0]["id"]
                if(cardOwner_ID === consumer_ID){
                    await query("INSERT INTO transaction VALUES(NULL, ?, 'Card', ?, ?)", [orders_ID, req.body.card.credit_card_num, orderValue])
                } else{
                    throw "Invalid Credit Card";
                }
            }
            let numItems = items.length; 
            items.forEach(async (item) => {
                await query('INSERT INTO ordered_item VALUES (?, ?, ?, ?, ?)', [orders_ID, vendor_ID, item.name, item.qty, item.price])
                if(--numItems === 0){
                    delete cart[res.email]
                    res.status(200).json({
                        order_ID: orders_ID
                    })
                }
            })
        }
    } catch {
        if(orders_ID>0) 
            await query('DELETE FROM orders WHERE id = ?', [orders_ID])
        res.status(400).send()
    }

})

app.get("/consumer/activeOrders", (authenticateConsumer), async (req, res) => {
    try {
        const id = (await query('SELECT id FROM consumer WHERE email_id = ?', [res.email]))[0]["id"]
        const Orders = await query(`SELECT orders.id, vendor.name, orders.status, orders.placed FROM orders, vendor WHERE orders.status != 'Cancelled' AND orders.status != 'Delivered' AND consumer_ID = ${id} AND orders.vendor_ID = vendor.id ORDER BY placed DESC`)
        res.status(200).json({
            orders: Orders
        })
    } catch {
        res.status(400).send()
    }
})

app.post("/consumer/trackOrder", (authenticateConsumer), async (req, res) => {
    try{
        const consumer_ID = (await query('SELECT id FROM consumer WHERE email_id = ?', [res.email]))[0]["id"]
        const order = (await query(`SELECT id, vendor_ID, status, value, placed FROM orders WHERE id = ? AND consumer_ID = ?`, [parseInt(req.body.id), consumer_ID]))[0]
        const vendorName = (await query(`SELECT name FROM vendor WHERE id = ?`, [order["vendor_ID"]]))[0]["name"]
        let payment_method = []
        const transactions = await query(`SELECT payment_method FROM transaction WHERE orders_ID = ?`, [parseInt(req.body.id)])
        transactions.forEach((element) => {
            payment_method.push(element["payment_method"])
        })
        const ordered_items = await query(`SELECT * from ordered_item WHERE orders_ID = ?`, [order["id"]])
        res.status(200).json({
            order_ID: order["id"],
            vendor: vendorName,
            status: order["status"],
            placedTime: order["placed"],
            value: order["value"],
            payment_method: payment_method,
            ordered_items: ordered_items
        })
    } catch {
        res.status(400).send()
    }
})

app.get("/vendor/activeOrders", (authenticateVendor), async (req, res) => {
    try {
        const id = (await query('SELECT id FROM vendor WHERE email_id = ?', [res.email]))[0]["id"]
        const Orders = await query(`SELECT orders.id, concat(consumer.first_name,' ',consumer.last_name) as name, orders.placed, orders.status, orders.value FROM orders, consumer WHERE orders.vendor_ID = ${id} AND (orders.status = 'Ready' OR orders.status = 'Placed' OR orders.status = 'Preparing') AND orders.consumer_ID = consumer.id ORDER BY placed DESC`)
        res.status(200).json({
            orders: Orders
        })
    } catch {
        res.status(400).send()
    }
})

app.post("/vendor/updateStatus", (authenticateVendor), async (req, res) => {
    try{
        const vendor = (await query('SELECT id, city, area FROM vendor WHERE email_id = ?', [res.email]))[0]
        const id = vendor["id"]
        const city = vendor["city"]
        const area = vendor["area"]
        const order = (await query(`SELECT status FROM orders WHERE id = ? AND vendor_ID = ?`, [parseInt(req.body.id), id]))[0]
        if(order.status === "Placed"){
            await query(`UPDATE orders SET status = 'Preparing' WHERE id=?`, [parseInt(req.body.id)])
            res.status(200).send()
        } else if(order.status === "Preparing"){
            await query(`UPDATE orders SET status = 'Ready' WHERE id=?`, [parseInt(req.body.id)])
            // assign a rider close by
            const riders = await query(`SELECT id FROM rider WHERE city = ? AND location = ?`, [city, area])
            const index = Math.floor(Math.random() * riders.length)
            const rider_ID = riders[index]["id"]
            await query(`UPDATE orders SET rider_ID = ? WHERE id=?`, [rider_ID, parseInt(req.body.id)])
            res.status(200).send()
        } else {
            res.status(400).send()
        }
    } catch {
        res.status(400).send()
    }
})

app.post("/consumer/cancelOrder", (authenticateConsumer), async (req, res) => {
    try{
        const consumer = (await query('SELECT id, wallet FROM consumer WHERE email_id = ?', [res.email]))[0]
        const id = consumer["id"]
        const wallet = consumer["wallet"]
        const order = (await query(`SELECT status FROM orders WHERE id = ? AND consumer_ID = ?`, [parseInt(req.body.id), id]))[0]
        if(order.status === "Placed"){
            await query(`UPDATE orders SET status = 'Cancelled' WHERE id=?`, [parseInt(req.body.id)])
            const transactions = await query(`SELECT * FROM transaction WHERE orders_ID = ?`, [parseInt(req.body.id)])
            let count = transactions.length
            if(count){
                transactions.map(async (t) => {
                    if(t.payment_method === "Card" || t.payment_method === "Wallet"){
                        await query(`UPDATE consumer SET wallet = ? WHERE id=?`, [wallet+t.amount, id])
                    }
                    if(--count===0){
                        res.status(200).json({
                            success: 1
                        })
                    }
                })
            }
        } else {
            res.status(200).send()
        }
    } catch {
        res.status(400).send()
    }
})

app.get("/rider/activeOrders", (authenticateRider), async (req, res) => {
    try {
        const id = (await query('SELECT id FROM rider WHERE email_id = ?', [res.email]))[0]["id"]
        const Orders = await query(`SELECT orders.id, vendor.name as vendor_name, concat(consumer.first_name,' ',consumer.last_name) as consumer_name, placed, delivered, orders.value, orders.rating, orders.status FROM orders, consumer, vendor WHERE orders.rider_ID = ${id} AND orders.vendor_ID = vendor.id AND orders.consumer_ID = consumer.id AND (orders.status = 'Ready' OR orders.status = 'Picked up') ORDER BY placed DESC`)
        res.status(200).json({
            orders: Orders
        })
    } catch {
        res.status(400).send()
    }
})

app.post("/rider/updateStatus", (authenticateRider), async (req, res) => {
    try{
        const vendor = (await query('SELECT id FROM rider WHERE email_id = ?', [res.email]))[0]
        const id = vendor["id"]
        const order = (await query(`SELECT status FROM orders WHERE id = ? AND rider_ID = ?`, [parseInt(req.body.id), id]))[0]
        if(order.status === "Ready"){
            await query(`UPDATE orders SET status = 'Picked up' WHERE id=?`, [parseInt(req.body.id)])
            res.status(200).send()
        } else if(order.status === "Picked up"){
            await query(`UPDATE orders SET status = 'Delivered' WHERE id=?`, [parseInt(req.body.id)])
            await query(`UPDATE orders SET delivered = now() WHERE id=?`, [parseInt(req.body.id)])
            res.status(200).send()
        } else {
            res.status(400).send()
        }
    } catch {
        res.status(400).send()
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}....`)
})