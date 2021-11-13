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

CREATE TABLE vendor(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    city VARCHAR(15) NOT NULL,
    area VARCHAR(30) NOT NULL,
    street_num SMALLINT NOT NULL,
    building_num SMALLINT NOT NULL,
    email_id VARCHAR(50) NOT NULL,
    bank_account CHAR(24) NOT NULL,
    image_url VARCHAR(255),
    rating NUMERIC(2,1),
    CHECK (city in ('Islamabad', 'Lahore', 'Karachi', 'Faislabad', 'Sialkot', 'Peshawar', 'Quetta')),
    CHECK (area in ('Gulberg', 'Defence', 'Model Town', 'Johar Town', 'Sea View')),
    CHECK (street_num >= 1),
    CHECK (building_num >= 1),
    CHECK (bank_account like 'PK[0-9][0-9][A-Z][A-Z][A-Z][A-Z][0-9999999999999999]'),
    CHECK (email_id like('%@%'))
);

CREATE TABLE phone(
    phone_num CHAR(11) PRIMARY KEY,
    ID INT NOT NULL,
    FOREIGN KEY (ID) REFERENCES vendor(ID),
    CHECK (phone_num like '03[0-999999999]')
    
);

CREATE TABLE delivery_radius(
    ID INT NOT NULL,
    city VARCHAR(15) NOT NULL,
    area VARCHAR(30) NOT NULL,
    FOREIGN KEY (ID) REFERENCES vendor(ID),
    CHECK (city in ('Islamabad', 'Lahore', 'Karachi', 'Faislabad', 'Sialkot', 'Peshawar', 'Quetta')),
    CHECK (area in ('Gulberg', 'Defence', 'Model Town', 'Johar Town', 'Sea View'))
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
    CHECK (category in ('Desi', 'Chinese', 'Fast Food', 'Arabic', 'Italian'))
);

CREATE TABLE rider(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(10) NOT NULL,
    middle_name VARCHAR(10),
    last_name VARCHAR(10) NOT NULL,
    city VARCHAR(15) NOT NULL,
    area VARCHAR(30) NOT NULL,
    street_num SMALLINT NOT NULL,
    building_num SMALLINT NOT NULL,
    vehicle_type VARCHAR(10) NOT NULL,
    vehicle_registration_num VARCHAR(10) NOT NULL,
    phone_num CHAR(11) NOT NULL,
    email_id VARCHAR(50) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    bank_account CHAR(24) NOT NULL,
    live_location VARCHAR(255),
    CHECK (city in ('Islamabad', 'Lahore', 'Karachi', 'Faislabad', 'Sialkot', 'Peshawar', 'Quetta')),
    CHECK (area in ('Gulberg', 'Defence', 'Model Town', 'Johar Town', 'Sea View')),
    CHECK (street_num >= 1),
    CHECK (building_num >= 1),
    CHECK (vehicle_type in ('Car', 'Motorcycle', 'Bicycle', 'Rickshaw')),
    CHECK (vehicle_registration_num like '[A-Z]%'),
    CHECK (gender in ('Male', 'Female', 'Other')),
    CHECK (email_id like('%@%')),
    CHECK (phone_num like '03[0-999999999]'),
    CHECK (bank_account like 'PK[0-9][0-9][A-Z][A-Z][A-Z][A-Z][0-9999999999999999]')
);

CREATE TABLE consumer(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(10) NOT NULL,
    middle_name VARCHAR(10),
    last_name VARCHAR(10) NOT NULL,
    city VARCHAR(15) NOT NULL,
    area VARCHAR(30) NOT NULL,
    street_num SMALLINT NOT NULL,
    building_num SMALLINT NOT NULL,
    phone_num CHAR(11) NOT NULL,
    wallet INT DEFAULT 0 NOT NULL,
    email_id VARCHAR(50) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    CHECK (city in ('Islamabad', 'Lahore', 'Karachi', 'Faislabad', 'Sialkot', 'Peshawar', 'Quetta')),
    CHECK (area in ('Gulberg', 'Defence', 'Model Town', 'Johar Town', 'Sea View')),
    CHECK (street_num >= 1),
    CHECK (building_num >= 1),
    CHECK (gender in ('Male', 'Female', 'Other')),
    CHECK (phone_num like '03[0-999999999]'),
    CHECK (email_id like('%@%')),
    CHECK (wallet >= 1)
);

CREATE TABLE credit_card(
    credit_card_num CHAR(12) NOT NULL,
    ID INT NOT NULL,
    cvc CHAR(3) NOT NULL,
    expiry_date_month CHAR(2) NOT NULL,
    expiry_date_year CHAR(4) NOT NULL,
    type VARCHAR(10) NOT NULL,
    PRIMARY KEY(credit_card_num),
    FOREIGN KEY (ID) REFERENCES consumer(ID),
    CHECK (cvc like '[0-9][0-9][0-9]'),
    CHECK (credit_card_num like '[0-999999999999]'),
    CHECK (expiry_date_month like '[0-99]'),
    CHECK (expiry_date_year like '[0-9999]'),
    CHECK (type in ('Visa', 'Master'))
);

CREATE TABLE orders(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    vendor_ID INT NOT NULL,
    consumer_ID INT NOT NULL,
    rider_ID INT NOT NULL,
    status VARCHAR(10) NOT NULL,
    value INT NOT NULL,
    rating NUMERIC(2, 1),
    placed DATETIME NOT NULL,
    delivered DATETIME NOT NULL,
    FOREIGN KEY (vendor_ID) REFERENCES vendor(ID),
    FOREIGN KEY (consumer_ID) REFERENCES consumer(ID),
    FOREIGN KEY (rider_ID) REFERENCES rider(ID),
    CHECK (status in ('Delivered', 'Picked up', 'Preparing', 'Cancelled')),
    CHECK (value >= 1),
    CHECK (rating >= 0 AND rating <= 5)
);


CREATE TABLE ordered_item(
    orders_ID INT NOT NULL,
    vendor_ID INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (orders_ID, vendor_ID),
    FOREIGN KEY (orders_ID) REFERENCES orders(ID),
    FOREIGN KEY (vendor_ID) REFERENCES vendor(ID),
    CHECK (quantity >= 1)
);

CREATE TABLE transaction(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    orders_ID INT NOT NULL,
    payment_method VARCHAR(6) NOT NULL,
    credit_card_num VARCHAR(16),
    FOREIGN KEY orders_ID REFERENCES orders(ID),
    FOREIGN KEY (credit_card_num) REFERENCES credit_card(credit_card_num),
    CHECK (payment_method in ('Online', 'Cash'))
);


