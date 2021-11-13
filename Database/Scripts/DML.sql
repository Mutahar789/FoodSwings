SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM phone;
DELETE FROM delivery_radius;
DELETE FROM ordered_item;
DELETE FROM item;
DELETE FROM orders;
DELETE FROM transaction;
DELETE FROM rider;
DELETE FROM credit_card;
DELETE FROM vendor;
DELETE FROM consumer;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO vendor(ID, name, city, area, street_num, building_num, email_id, bank_account, image_url, rating) VALUES (1, "KFC", "Lahore", "Defence", 1, 88, "KFC@gmail.com", "PK11MEZN1234567891234567", NULL, 4.5);
INSERT INTO vendor(ID, name, city, area, street_num, building_num, email_id, bank_account, image_url, rating) VALUES (NULL, "McDonald's", "Karachi", "Gulberg", 3, 144, "McDonald@gmail.com", "PK22MEZN1434517891234567", NULL, 5);
INSERT INTO vendor(ID, name, city, area, street_num, building_num, email_id, bank_account, image_url, rating) VALUES (NULL, "Karachi Hot 'n Spicy", "Faisalabad", "Model Town", 2, 192, "KHS@gmail.com", "PK13MEZN1234565891234567", NULL, 4);
INSERT INTO vendor(ID, name, city, area, street_num, building_num, email_id, bank_account, image_url, rating) VALUES (NULL, "Abu Shawarma", "Quetta", "Johar Town", 1, 41, "AbuShawarma@gmail.com", "PK22MEZN1234567891236567", NULL, 4);
INSERT INTO vendor(ID, name, city, area, street_num, building_num, email_id, bank_account, image_url, rating) VALUES (NULL, "Domino's", "Peshawar", "Sea View", 1,200, "Dominos@gmail.com", "PK31MEZN1234567596231567", NULL, 5);

INSERT INTO consumer(ID, first_name, middle_name, last_name, city, area, street_num, building_num, phone_num, wallet, email_id, gender) VALUES (1, "Mohammad", "Taha", "Zakir", "Karachi", "Sea View", 42, 2, "03234567891", 500, "tahazakir@gmail.com", "Male");
INSERT INTO consumer(ID, first_name, middle_name, last_name, city, area, street_num, building_num, phone_num, wallet, email_id, gender) VALUES (NULL, "Muhammad", NULL, "Taha", "Lahore", "Gulberg", 321, 52, "03241567891", 0, "muhammadtaha@gmail.com", "Female");
INSERT INTO consumer(ID, first_name, middle_name, last_name, city, area, street_num, building_num, phone_num, wallet, email_id, gender) VALUES (NULL, "Hamza", NULL, "Rafi", "Quetta", "Defence", 111, 1, "03234565811", 142, "hamzarafi@gmail.com", "Other");
INSERT INTO consumer(ID, first_name, middle_name, last_name, city, area, street_num, building_num, phone_num, wallet, email_id, gender) VALUES (NULL, "Syed", "Ali", "Irteza", "Faisalabad", "Model Town", 31, 412, "03224511891", 214, "alii@gmail.com", "Female");
INSERT INTO consumer(ID, first_name, middle_name, last_name, city, area, street_num, building_num, phone_num, wallet, email_id, gender) VALUES (NULL, "Abdullah", NULL, "Ijaz", "Sialkot", "Defence", 511, 112, "03234564411", 11, "abdullahijz@gmail.com", "Male");

INSERT INTO rider(ID, first_name, middle_name, last_name, city, area, street_num, building_num, vehicle_type, vehicle_registration_num, phone_num, email_id, gender, bank_account, live_location) VALUES(1, "Mutahar", NULL, "Ali", "Lahore", "Gulberg", 3, 14, "Car", "LE-8080", "03004958800", "mutahar@gmail.com" ,"Male", "PK86UBLT5050358099703523", NULL);
INSERT INTO rider(ID, first_name, middle_name, last_name, city, area, street_num, building_num, vehicle_type, vehicle_registration_num, phone_num, email_id, gender, bank_account, live_location) VALUES(NULL, "Faizan", NULL, "Elahi", "Lahore", "Defence", 20, 15, "Motorcycle", "A420", "03008976543", "faizan@gmail.com", "Male", "PK86JSLT5050358096303523", NULL);
INSERT INTO rider(ID, first_name, middle_name, last_name, city, area, street_num, building_num, vehicle_type, vehicle_registration_num, phone_num, email_id, gender, bank_account, live_location) VALUES(NULL, "Muhammad", "Bilal", "Shahid", "Lahore", "Model Town", 5, 420, "Bicycle", "LQ-69", "03314950730", "bilal@gmail.com", "Other", "PK89HBLT5050358099709876", NULL);
INSERT INTO rider(ID, first_name, middle_name, last_name, city, area, street_num, building_num, vehicle_type, vehicle_registration_num, phone_num, email_id, gender, bank_account, live_location) VALUES(NULL, "Samee", NULL, "Arif", "Karachi", "Sea view", 3, 24, "Car", "LE-7171", "03244957700", "samee@gmail.com", "Male", "PK71UBLT5050058099693523", NULL);
INSERT INTO rider(ID, first_name, middle_name, last_name, city, area, street_num, building_num, vehicle_type, vehicle_registration_num, phone_num, email_id, gender, bank_account, live_location) VALUES(NULL, "Mustafa", NULL, "Sidiqui", "Faisalabad", "Defence", 8, 34, "Motorcycle", "LEF-8197", "03004958800", "mutafa@gmail.com","Male", "PK51FSBL5050358099703523", NULL);
INSERT INTO rider(ID, first_name, middle_name, last_name, city, area, street_num, building_num, vehicle_type, vehicle_registration_num, phone_num, email_id, gender, bank_account, live_location) VALUES(NULL, "Hafsa", NULL, "Khan", "Islamabad", "Defence", 15, 8, "Car", "LEA-8097", "03518875963", "khan@gmail.com", "Female", "PK11SKLE5050357799703523", NULL);

INSERT INTO orders(ID, vendor_ID, consumer_ID, rider_ID, status, value, rating, placed, delivered) VALUES(1, 1, 2, 1, "Delivered", 450, 5.0, '2021-04-03 14:00:45', '2021-04-03 14:30:45');
INSERT INTO orders(ID, vendor_ID, consumer_ID, rider_ID, status, value, rating, placed, delivered) VALUES(NULL, 3, 2, 3, "Delivered", 650, 4.2, '2021-07-14 17:00:16', '2021-07-14 17:55:45');
INSERT INTO orders(ID, vendor_ID, consumer_ID, rider_ID, status, value, rating, placed, delivered) VALUES(NULL, 3, 1, 5, "Delivered", 699, 1.5, '2021-11-03 14:00:45', '2021-11-03 14:30:16');
INSERT INTO orders(ID, vendor_ID, consumer_ID, rider_ID, status, value, rating, placed, delivered) VALUES(NULL, 2, 5, 2, "Delivered", 788, 4.0, '2021-10-21 13:35:52', '2021-10-21 14:45:12');
INSERT INTO orders(ID, vendor_ID, consumer_ID, rider_ID, status, value, rating, placed, delivered) VALUES(NULL, 4, 4, 2, "Delivered", 1012, 3.5, '2021-04-03 14:00:45', '2021-04-03 14:30:45');
INSERT INTO orders(ID, vendor_ID, consumer_ID, rider_ID, status, value, rating, placed, delivered) VALUES(NULL, 5, 3, 2, "Cancelled", 920, 2.5, '2021-05-18 14:16:45', '2021-05-18 14:55:45');

INSERT INTO phone(phone_num, ID) VALUES ("03326677133", 1);
INSERT INTO phone(phone_num, ID) VALUES ("03322217133", 2);
INSERT INTO phone(phone_num, ID) VALUES ("03326611533", 3);
INSERT INTO phone(phone_num, ID) VALUES ("03521677133", 4);
INSERT INTO phone(phone_num, ID) VALUES ("03112377133", 5);

INSERT INTO delivery_radius(ID, city, area) VALUES (1, "Lahore", "Defence");
INSERT INTO delivery_radius(ID, city, area) VALUES (1, "Lahore", "Gulberg");
INSERT INTO delivery_radius(ID, city, area) VALUES (2, "Karachi", "Sea View");
INSERT INTO delivery_radius(ID, city, area) VALUES (3, "Faisalabad", "Johar Town");
INSERT INTO delivery_radius(ID, city, area) VALUES (4, "Quetta", "Defence");
INSERT INTO delivery_radius(ID, city, area) VALUES (5, "Sialkot", "Model Town");

INSERT INTO item(ID, name, price, category, image_url, description) VALUES (1, "Burger", 500, "Fast Food", NULL, "Good burger");
INSERT INTO item(ID, name, price, category, image_url, description) VALUES (1, "Chicken leg", 250, "Desi", NULL, "Bad BBQ");
INSERT INTO item(ID, name, price, category, image_url, description) VALUES (2, "Garlic Chicken", 650, "Chinese", NULL, "Okayish Chinese");
INSERT INTO item(ID, name, price, category, image_url, description) VALUES (3, "Shawarma", 420, "Arabic", NULL, "Good Shawarma");
INSERT INTO item(ID, name, price, category, image_url, description) VALUES (4, "Pasta", 550, "Italian", NULL, "Best Pasta");
INSERT INTO item(ID, name, price, category, image_url, description) VALUES (5, "Pizza Xtreme", 1500, "Fast Food", NULL, "Best Pizza");

INSERT INTO credit_card(credit_card_num, ID, cvc, expiry_date_month, expiry_date_year, type) VALUES (123456789123, 1, 123, 12, 2020, "Visa");
INSERT INTO credit_card(credit_card_num, ID, cvc, expiry_date_month, expiry_date_year, type) VALUES (123451711123, 2, 213, 01, 2023, "Master");
INSERT INTO credit_card(credit_card_num, ID, cvc, expiry_date_month, expiry_date_year, type) VALUES (121222554423, 3, 451, 05, 2024, "Visa");
INSERT INTO credit_card(credit_card_num, ID, cvc, expiry_date_month, expiry_date_year, type) VALUES (155556781123, 4, 981, 07, 2026, "Visa");
INSERT INTO credit_card(credit_card_num, ID, cvc, expiry_date_month, expiry_date_year, type) VALUES (123427666623, 5, 551, 11, 2019, "Master");

INSERT INTO ordered_item(orders_ID, vendor_ID, name, quantity) VALUES (1, 1, "Burger", 2);
INSERT INTO ordered_item(orders_ID, vendor_ID, name, quantity) VALUES (1, 1, "Chicken leg", 2);
INSERT INTO ordered_item(orders_ID, vendor_ID, name, quantity) VALUES (2, 2, "Garlic Chicken", 5);
INSERT INTO ordered_item(orders_ID, vendor_ID, name, quantity) VALUES (3, 3, "Shawarma", 3);
INSERT INTO ordered_item(orders_ID, vendor_ID, name, quantity) VALUES (4, 4, "Pasta", 4);
INSERT INTO ordered_item(orders_ID, vendor_ID, name, quantity) VALUES (5, 5, "Pizza Xtreme", 2);

INSERT INTO transaction(ID, orders_ID, payment_method, credit_card_num) VALUES (1, 1, "Online", 123456789123);
INSERT INTO transaction(ID, orders_ID, payment_method, credit_card_num) VALUES (NULL, 2, "Cash", NULL);
INSERT INTO transaction(ID, orders_ID, payment_method, credit_card_num) VALUES (NULL, 3, "Online", 121222554423);
INSERT INTO transaction(ID, orders_ID, payment_method, credit_card_num) VALUES (NULL, 4, "Online", 155556781123);
INSERT INTO transaction(ID, orders_ID, payment_method, credit_card_num) VALUES (NULL, 5, "Cash", NULL);
