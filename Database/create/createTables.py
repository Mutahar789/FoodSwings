createTables = """
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS phone;
DROP TABLE IF EXISTS delivery_radius;
DROP TABLE IF EXISTS ordered_item;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS rider;
DROP TABLE IF EXISTS credit_card;
DROP TABLE IF EXISTS vendor;
DROP TABLE IF EXISTS consumer;
DROP TABLE IF EXISTS locality;

SET FOREIGN_KEY_CHECKS = 1;

create TABLE locality(
    city VARCHAR(15) NOT NULL,
    area VARCHAR(30) NOT NULL,
    PRIMARY KEY(city, area),
    CHECK (city in ('Islamabad', 'Lahore', 'Karachi', 'Faisalabad', 'Sialkot', 'Peshawar', 'Quetta'))
);

CREATE TABLE vendor(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL UNIQUE,
    city VARCHAR(15) NOT NULL,
    area VARCHAR(30) NOT NULL,
    street_num SMALLINT NOT NULL,
    building_num SMALLINT NOT NULL,
    email_id VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(64) NOT NULL,
    bank_account CHAR(24) NOT NULL,
    image_url VARCHAR(255),
    rating NUMERIC(2,1),
    FOREIGN KEY (city, area) REFERENCES locality(city, area),
    CHECK (street_num >= 1),
    CHECK (building_num >= 1),
    CHECK (REGEXP_LIKE(bank_account, 'PK[0-9][0-9][A-Z][A-Z][A-Z][A-Z][0-9999999999999999]'))
);

CREATE TABLE phone(
    phone_num CHAR(11) PRIMARY KEY,
    ID INT NOT NULL,
    FOREIGN KEY (ID) REFERENCES vendor(ID),
    CHECK (REGEXP_LIKE(phone_num, '03[0-999999999]'))
    
);

CREATE TABLE delivery_radius(
    ID INT NOT NULL,
    city VARCHAR(15) NOT NULL,
    area VARCHAR(30) NOT NULL,
    PRIMARY KEY (ID, city, area),
    FOREIGN KEY (ID) REFERENCES vendor(ID),
    FOREIGN KEY (city, area) REFERENCES locality(city, area)
);

CREATE TABLE item(
    ID INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(20),
    image_url VARCHAR(255),
    description VARCHAR(250),
    PRIMARY KEY (ID, name),
    FOREIGN KEY (ID) REFERENCES vendor(ID),
    CHECK (price >= 1),
    CHECK (category in ('Desi', 'Burger', 'Pizza', 'Pasta', 'Desserts'))
);

CREATE TABLE rider(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    middle_name VARCHAR(30),
    last_name VARCHAR(15) NOT NULL,
    city VARCHAR(15) NOT NULL,
    area VARCHAR(30) NOT NULL,
    street_num SMALLINT NOT NULL,
    building_num SMALLINT NOT NULL,
    vehicle_type VARCHAR(10) NOT NULL,
    vehicle_registration_num CHAR(7) NOT NULL UNIQUE,
    phone_num CHAR(11) NOT NULL UNIQUE,
    email_id VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(64) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    bank_account CHAR(24) NOT NULL,
    location VARCHAR(30),
    FOREIGN KEY (city, area) REFERENCES locality(city, area),
    CHECK (street_num >= 1),
    CHECK (building_num >= 1),
    CHECK (vehicle_type in ('Car', 'Motorcycle', 'Bicycle')),
    CHECK (REGEXP_LIKE(vehicle_registration_num, 'LE-[0-9999]')),
    CHECK (gender in ('Male', 'Female', 'Other')),
    CHECK (REGEXP_LIKE(phone_num, '03[0-999999999]')),
    CHECK (REGEXP_LIKE(bank_account, 'PK[0-9][0-9][A-Z][A-Z][A-Z][A-Z][0-9999999999999999]'))
);

CREATE TABLE consumer(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    middle_name VARCHAR(30),
    last_name VARCHAR(15) NOT NULL,
    city VARCHAR(15) NOT NULL,
    area VARCHAR(30) NOT NULL,
    street_num SMALLINT NOT NULL,
    building_num SMALLINT NOT NULL,
    phone_num CHAR(11) NOT NULL UNIQUE,
    wallet INT DEFAULT 0 NOT NULL,
    email_id VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(64) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    FOREIGN KEY (city, area) REFERENCES locality(city, area),
    CHECK (street_num >= 1),
    CHECK (building_num >= 1),
    CHECK (gender in ('Male', 'Female', 'Other')),
    CHECK (REGEXP_LIKE(phone_num, '03[0-999999999]')),
    CHECK (wallet >= 0)
);

CREATE TABLE credit_card(
    credit_card_num CHAR(12) PRIMARY KEY,
    ID INT NOT NULL,
    cvc CHAR(3) NOT NULL,
    expiry_date_month CHAR(2) NOT NULL,
    expiry_date_year CHAR(4) NOT NULL,
    type VARCHAR(10) NOT NULL,
    FOREIGN KEY (ID) REFERENCES consumer(ID),
    CHECK (REGEXP_LIKE(cvc, '[0-999]')),
    CHECK (REGEXP_LIKE(credit_card_num, '[0-999999999999]')),
    CHECK (REGEXP_LIKE(expiry_date_month, '[0-99]')),
    CHECK (REGEXP_LIKE(expiry_date_year, '[0-9999]')),
    CHECK (type in ('Visa', 'Master'))
);

CREATE TABLE orders(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    vendor_ID INT NOT NULL,
    consumer_ID INT NOT NULL,
    rider_ID INT,
    status VARCHAR(10) NOT NULL,
    value INT NOT NULL,
    rating NUMERIC(2, 1),
    placed DATETIME NOT NULL,
    delivered DATETIME,
    FOREIGN KEY (vendor_ID) REFERENCES vendor(ID),
    FOREIGN KEY (consumer_ID) REFERENCES consumer(ID),
    FOREIGN KEY (rider_ID) REFERENCES rider(ID),
    CHECK (status in ('Delivered', 'Picked up', 'Preparing', 'Cancelled', 'Placed', 'Ready')),
    CHECK (((status = 'Cancelled' OR status = 'Preparing' OR status = 'Placed') And rider_ID IS NULL) OR ((status = 'Picked up' OR status = 'Ready' OR status = 'Delivered') And rider_ID IS NOT NULL)),
    CHECK (value >= 1),
    CHECK (rating >= 0 AND rating <= 5)
);


CREATE TABLE ordered_item(
    orders_ID INT NOT NULL,
    vendor_ID INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (orders_ID, vendor_ID, name),
    FOREIGN KEY (orders_ID) REFERENCES orders(ID),
    FOREIGN KEY (vendor_ID) REFERENCES vendor(ID),
    CHECK (quantity >= 1)
);

CREATE TABLE transaction(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    orders_ID INT NOT NULL,
    payment_method VARCHAR(6) NOT NULL,
    credit_card_num CHAR(12),
    FOREIGN KEY (orders_ID) REFERENCES orders(ID),
    FOREIGN KEY (credit_card_num) REFERENCES credit_card(credit_card_num),
    CHECK (payment_method in ('Wallet', 'Cash', 'Card')),
    CHECK (((payment_method = 'Cash' OR payment_method = 'Wallet') AND credit_card_num IS NULL) OR (payment_method = 'Card' AND credit_card_num IS NOT NULL))
);

"""
