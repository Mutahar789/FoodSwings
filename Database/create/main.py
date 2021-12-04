#!/usr/bin/python3
import random
import mysql
from mysql.connector import Error
import createTables
import hashlib

letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
vehicleTypes = ['Car', 'Motorcycle', 'Bicycle']

with open("dataFiles/images.txt", "r") as f:
    image_urls = f.read().splitlines()

with open("dataFiles/vendor_names.txt", encoding="utf-8") as f:
    vendor_names = f.read().splitlines()
vendor_names = list(dict.fromkeys(vendor_names))

with open("dataFiles/boy_names.txt", "r") as f:
    boy_names = f.read().splitlines()

with open("dataFiles/girl_names.txt", "r") as f:
    girl_names = f.read().splitlines()

with open("dataFiles/localities.txt", "r") as f:
    lines = f.read().splitlines()

with open("dataFiles/items.txt", "r") as f:
    lines2 = f.read().splitlines()

items = []
for l in lines2:
    price, category, name, description, img = l.split("|")
    item = {"category": category, "name": name, "image_url": img, "price": price, "description": description}
    items.append(item)

i = 0
localities = {}
while i<len(lines):
    l = lines[i]
    city, numAreas = l.split()
    localities[city] = []
    i+=1
    for j in range(int(numAreas)):
        l = lines[i]
        localities[city].append(l)
        i+=1

cities = list(localities.keys())
numCities = len(cities)
numAreas = {}
for city in localities.keys():
    numAreas[city] = len(localities[city])

numGirlNames = len(girl_names)
numBoyNames = len(boy_names)
numVendorNames = len(vendor_names)
numImageUrls = len(image_urls)

takenPhones = set()
def generatePhone():
    phoneNum = "03"
    for i in range(9):
        rand = random.randint(0,9)
        phoneNum += str(rand)
    while phoneNum in takenPhones:
        phoneNum = "03"
        for i in range(9):
            rand = random.randint(0,9)
            phoneNum += str(rand)
    takenPhones.add(phoneNum)
    return phoneNum

takenAcc = set()
def generateBankAcc():
    bankAcc = "PK"
    for i in range(2):
        rand = random.randint(1,9)
        bankAcc += str(rand)
    for i in range(4):
        rand = random.randint(0,25)
        bankAcc += letters[rand]
    for i in range(16):
        rand = random.randint(0,9)
        bankAcc += str(rand)
    while bankAcc in takenAcc:
        bankAcc = "PK"
        for i in range(2):
            rand = random.randint(1,9)
            bankAcc += str(rand)
        for i in range(4):
            rand = random.randint(0,25)
            bankAcc += letters[rand]
        for i in range(16):
            rand = random.randint(0,9)
            bankAcc += str(rand)
    takenAcc.add(bankAcc)
    return bankAcc

takenReg = set()
def generateVehicleReg():
    vehicleReg = "LE-"
    for i in range(4):
        rand = random.randint(0,9)
        vehicleReg += str(rand)
    while vehicleReg in takenReg:
        vehicleReg = "LE-"
        for i in range(4):
            rand = random.randint(0,9)
            vehicleReg += str(rand)
    takenReg.add(vehicleReg)
    return vehicleReg

takenCards = set()
def generateCard():
    card = ""
    for i in range(12):
        rand = random.randint(0,9)
        card += str(rand)
    while card in takenCards:
        card = ""
        for i in range(12):
            rand = random.randint(0,9)
            card += str(rand)
    takenCards.add(card)
    cvc = ""
    for i in range(3):
        rand = random.randint(1,9)
        cvc += str(rand)
    return card, cvc

def generateRating():
    rating = random.random()*1.8 + 3
    return round(rating,1)

def generateTimestamp():
    leadingZero = lambda x: "0" if x<10 else ""

    year = ["2020", "2021"][random.randint(0,1)]
    month = random.randint(1,12)
    maxDays = 30
    if month in [1,3,5,7,8,10,12]:
        maxDays = 31
    elif month == 2:
        maxDays = 28
    month = leadingZero(month) + str(month)
    day = random.randint(1,maxDays)
    day = leadingZero(day) + str(day)
    
    hours = random.randint(0, 23)
    hours = leadingZero(hours) + str(hours)
    minutes = random.randint(0,59)
    minutes = leadingZero(minutes) + str(minutes)
    seconds = random.randint(0,59)
    seconds = leadingZero(seconds) + str(seconds)

    return {"year": year, "month": month, "day": day, "hours": hours, "minutes": minutes, "seconds": seconds}

def getType():
    types = ["Visa", "Master"]
    rand = random.randint(0,1)
    return types[rand]

def getImageUrl():
    rand = random.randint(0,numImageUrls-1)
    return image_urls[rand]

def getName(gender):
    if gender == "Male":
        rand = random.randint(0,numBoyNames-1)
        return boy_names[rand]
    else:
        rand = random.randint(0,numGirlNames-1)
        return girl_names[rand]

def getCity():
    rand = random.randint(0, numCities-1)
    return cities[rand]

def getArea(city):
    rand = random.randint(0, numAreas[city]-1)
    return localities[city][rand]

def getItem():
    rand = random.randint(0, len(items)-1)
    return items[rand]

def getGender():
    rand = random.random()
    if rand<=0.425:
        return "Male"
    elif rand<=0.85:
        return "Female"
    else:
        return "Other"

try:
    connection = mysql.connector.connect(host='localhost',
                                        database='FoodSwingsDB',
                                        user='root',
                                        password='12345')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)

        Query = createTables.createTables        
        for _ in cursor.execute(Query, multi=True):
            pass
        print("populating locality table")
        for city in localities.keys():
            for area in localities[city]:
                Query = "INSERT INTO locality(city, area) VALUES ('"+city+"','"+area+"');"
                cursor.execute(Query)
        
        vendors = {}
        for c in cities:
            vendors[c] = []
        print("populating vendor table")
        id = 1
        for name in vendor_names:
            vendor = {}
            vendor["id"] = id
            vendor["name"] = name
            vendor["city"] = getCity()
            vendor["area"] = getArea(vendor["city"])
            vendor["street"] = random.randint(1, 100)
            vendor["buidling"] = random.randint(1, 250)
            vendor["email"] = f'{name}@gmail.com'
            vendor["pw"] = hashlib.sha256("1234".encode('utf-8')).hexdigest()
            vendor["IBAN"] = generateBankAcc()
            vendor["image_url"] = getImageUrl()
            Query = f'''INSERT INTO vendor VALUES ({id}, "{name}", "{vendor["city"]}", "{vendor["area"]}", {vendor["street"]}, {vendor["buidling"]}, "{vendor["email"]}", "{vendor["pw"]}", "{vendor["IBAN"]}", "{vendor["image_url"]}", NULL);'''
            cursor.execute(Query)
            
            # populating phone table
            numPhones = random.randint(1,4) # between 1-4 phone numbers
            for i in range(numPhones):
                Query = f'''INSERT INTO phone VALUES ("{generatePhone()}", {id});'''
                cursor.execute(Query)
            
            city = vendor["city"]
            area = vendor["area"]
            
            # populating delivery_radius table
            radius = set()
            for i in range(5):
                area = getArea(city)
                while area in radius:
                    area = getArea(city)
                radius.add(area)
                Query = f'''INSERT INTO delivery_radius VALUES ({id}, "{city}", "{area}");'''
                cursor.execute(Query)
            
            # populating items table
            numItems = random.randint(10,20)
            menu = set()
            vendor["menu"] = []
            for i in range(numItems):
                item = getItem()
                while item["name"] in menu:
                    item = getItem()
                menu.add(item["name"])
                vendor["menu"].append(item)
                Query = f'''INSERT INTO item VALUES ({id}, "{item["name"]}", {item["price"]}, "{item["category"]}", "{item["image_url"]}", "{item["description"]}");'''
                cursor.execute(Query)
            vendors[vendor["city"]].append(vendor)
            id+=1
        
        riders = {}
        for c in cities:
            riders[c] = []
        print("populating rider table")
        for id in range(1, 1000):
            rider = {}
            rider["id"] = id
            rider["gender"] = getGender()
            rider["f_name"] = getName(rider["gender"])
            rider["l_name"] = getName(rider["gender"])
            rider["city"] = getCity()
            rider["area"] = getArea(rider["city"])
            rider["street"] = random.randint(1, 100)
            rider["buidling"] = random.randint(1, 250)
            rider["v_type"] = vehicleTypes[random.randint(0,2)]
            rider["v_reg"] = generateVehicleReg()
            rider["phone"] = generatePhone()
            rider["email"] = f"{rider['f_name']}{id}@gmail.com"
            rider["pw"] = hashlib.sha256("1234".encode('utf-8')).hexdigest()
            rider["bankAcc"] = generateBankAcc()
            rider["location"] = getArea(rider["city"]) 

            Query= f"""INSERT INTO rider VALUES({id}, "{rider["f_name"]}", NULL, "{rider["l_name"]}", "{rider["city"]}", "{rider["area"]}", {rider["street"]}, {rider["buidling"]}, "{rider["v_type"]}", "{rider["v_reg"]}", "{rider["phone"]}", "{rider["email"]}", "{rider["pw"]}","{rider["gender"]}", "{rider["bankAcc"]}", "{rider["location"]}");"""
            cursor.execute(Query)
            riders[rider["city"]].append(rider)
        
        consumers = {}
        for c in cities:
            consumers[c] = []
        print("populating consumer table")
        for id in range(1, 1000):
            consumer = {}
            consumer["id"] = id
            consumer["gender"] = getGender()
            consumer["f_name"] = getName(consumer["gender"])
            consumer["l_name"] = getName("Male")
            consumer["city"] = getCity()
            consumer["area"] = getArea(consumer["city"])
            consumer["street"] = random.randint(1, 100)
            consumer["buidling"] = random.randint(1, 250)
            consumer["phone"] = generatePhone()
            consumer["email"] = f"{consumer['f_name']}{id}@gmail.com"
            consumer["pw"] = hashlib.sha256("1234".encode('utf-8')).hexdigest()
            consumer["wallet"] = 0

            Query= f"""INSERT INTO consumer VALUES({id}, "{consumer["f_name"]}", NULL, "{consumer["l_name"]}", "{consumer["city"]}", "{consumer["area"]}", {consumer["street"]}, {consumer["buidling"]}, "{consumer["phone"]}", {consumer["wallet"]}, "{consumer["email"]}", "{consumer["pw"]}","{consumer["gender"]}");"""
            cursor.execute(Query)

            # populating credit_card table
            numCards = random.randint(0,3)
            consumer["cards"] = []
            for i in range(numCards):
                card, cvc = generateCard()
                type = getType()
                Query = f"""INSERT INTO credit_card VALUES ({card}, {id}, {cvc}, 12, 2023, "{type}");"""
                cursor.execute(Query)
                consumer["cards"].append(card)
            
            consumers[consumer["city"]].append(consumer)
            Query = '''SET FOREIGN_KEY_CHECKS = 0;'''
            cursor.execute(Query)

        print("populating orders table")
        for id in range(1, 7500):
            city = getCity()
            vendor = vendors[city][random.randint(0, len(vendors[city])-1)]
            vendorID = vendor["id"]
            consumer = consumers[city][random.randint(0, len(consumers[city])-1)]
            consumerID = consumer["id"]
            rider = riders[city][random.randint(0, len(riders[city])-1)]
            riderID = rider["id"]
            rand = random.random()
            status = "Delivered"
            if(rand>=0.9):
                status = "Cancelled"

            # populating ordered_items
            menu = vendor["menu"]
            numItems = random.randint(1,4)
            itemsOrdered = set()
            value = 0
            for i in range(numItems):
                item = menu[random.randint(0, len(menu)-1)]
                while item["name"] in itemsOrdered:
                    item = menu[random.randint(0, len(menu)-1)]
                qty = random.randint(1,3)
                Query = f'''INSERT INTO ordered_item VALUES ({id}, {vendorID}, "{item["name"]}", {qty});'''
                cursor.execute(Query)
                itemsOrdered.add(item["name"])
                value += int(item["price"])*qty
            
            rating = generateRating()
            placed = generateTimestamp()
            delivered = "NULL"
            if status == "Delivered":
                delivered = generateTimestamp()

            if status == "Delivered":
                Query = f'''INSERT INTO orders VALUES({id}, {vendorID}, {consumerID}, {riderID}, "{status}", {value}, {rating}, '{placed["year"]}-{placed["month"]}-{placed["day"]} {placed["hours"]}:{placed["minutes"]}:{placed["seconds"]}', '{delivered["year"]}-{delivered["month"]}-{delivered["day"]} {delivered["hours"]}:{delivered["minutes"]}:{delivered["seconds"]}');'''
            else:
                Query = f'''INSERT INTO orders VALUES({id}, {vendorID}, {consumerID}, NULL, "{status}", {value}, {rating}, '{placed["year"]}-{placed["month"]}-{placed["day"]} {placed["hours"]}:{placed["minutes"]}:{placed["seconds"]}', NULL);'''

            cursor.execute(Query)

            # populate transaction table
            payment_method = "Cash"
            if consumer["cards"]:
                payment_method = ["Cash", "Card"][random.randint(0,1)]
            card = "NULL"
            if payment_method == "Card":
                card = consumer["cards"][random.randint(0, len(consumer["cards"])-1)]
                if status == "Cancelled":
                    consumer["wallet"] += value
                    Query = f"""UPDATE consumer SET wallet={consumer["wallet"]} where id={consumerID}"""
                    cursor.execute(Query)
                    
            Query = f"""INSERT INTO transaction VALUES ({id}, {id}, "{payment_method}", {card});"""
            cursor.execute(Query)

        Query = '''SET FOREIGN_KEY_CHECKS = 1;'''
        cursor.execute(Query)

        print("updating vendor ratings based on orders")
        Query = f'''SELECT vendor_ID, avg(rating) FROM orders GROUP BY vendor_ID;'''
        cursor.execute(Query)
        ratings = cursor.fetchall()
        for rating in ratings:
            Query = f'''UPDATE vendor SET rating={round(rating[1], 1)} WHERE id={rating[0]};'''
            cursor.execute(Query)

        print("DONE!")
        connection.commit()

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")