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

INSERT INTO vendor VALUES (1, "KFC", "Lahore", "Defence", 1, 88, "KFC@gmail.com", "2c14410b57ba9fc46f27495716d99aca764d2679284619c5e274fd0da9506515", "PK11MEZN1234567891234567", NULL, 4.5);
INSERT INTO vendor VALUES (NULL, "McDonald's", "Karachi", "Gulberg", 3, 144, "McDonald@gmail.com", "1081fdaaeceae9d9b76c9d3931d85438bffd0c75c2bb8f1784069a6ea121a37e", "PK22MEZN1434517891234567", NULL, 5);
INSERT INTO vendor VALUES (NULL, "Karachi Hot 'n Spicy", "Faisalabad", "Model Town", 2, 192, "KHS@gmail.com", "ab811859c81098219847f9af56596c0f866d23af341cd72685f3d5a1c675d016" ,"PK13MEZN1234565891234567", NULL, 4);
INSERT INTO vendor VALUES (NULL, "Abu Shawarma", "Quetta", "Johar Town", 1, 41, "AbuShawarma@gmail.com", "4cffa6a5e1a748fbfc4e9f2aee66901f0c0ab8a16c66eeb5ef1a32c6b78152ee","PK22MEZN1234567891236567", NULL, 4);
INSERT INTO vendor VALUES (NULL, "Domino's", "Peshawar", "Sea View", 1,200, "Dominos@gmail.com", "e2d456103744ec017d76034eb2703cf0b22ed129c3ba849fcace4b80da543e0d","PK31MEZN1234567596231567", NULL, 5);

INSERT INTO consumer VALUES (1, "Mohammad", "Taha", "Zakir", "Karachi", "Sea View", 42, 2, "03234567891", 500, "tahazakir@gmail.com", "7fb3e035d23b1566cdb3dc36cb4c7cf92e0c3b73a0b5b9500869e1369a58ec8d","Male");
INSERT INTO consumer VALUES (NULL, "Muhammad", NULL, "Taha", "Lahore", "Gulberg", 321, 52, "03241567891", 0, "muhammadtaha@gmail.com", "409521f02c8b29bd4f76b832de53a56fb64ac90f85f6fdce1545f53c643b2219","Female");
INSERT INTO consumer VALUES (NULL, "Hamza", NULL, "Rafi", "Quetta", "Defence", 111, 1, "03234565811", 142, "hamzarafi@gmail.com", "15e68b1f46577e27d82b47596b5bb9224ec847838c53432b4ae182a4e20a04e7","Other");
INSERT INTO consumer VALUES (NULL, "Syed", "Ali", "Irteza", "Faisalabad", "Model Town", 31, 412, "03224511891", 214, "alii@gmail.com", "e24fbd8800ea1d703469252d8e786e7c95067fe5e2ab3f29d170691dde4d1385","Female");
INSERT INTO consumer VALUES (NULL, "Abdullah", NULL, "Ijaz", "Sialkot", "Defence", 511, 112, "03234564411", 11, "abdullahijz@gmail.com", "11fb682be0a0233d5fb899721ecfc1827d20f0d2ff2e093310efa61efca8af1c","Male");

INSERT INTO rider VALUES(1, "Mutahar", NULL, "Ali", "Lahore", "Gulberg", 3, 14, "Car", "LE-8080", "03004958800", "mutahar@gmail.com", "f0055891f09fff4839b344a4af5e0482696cab0e0bf307455661ba4056c787ee","Male", "PK86UBLT5050358099703523", NULL);
INSERT INTO rider VALUES(NULL, "Faizan", NULL, "Elahi", "Lahore", "Defence", 20, 15, "Motorcycle", "A420", "03008976543", "faizan@gmail.com", "9a1954243a3851247769c8525d22faf6addfb36cd3fb347449b14c1e18a98214","Male", "PK86JSLT5050358096303523", NULL);
INSERT INTO rider VALUES(NULL, "Muhammad", "Bilal", "Shahid", "Lahore", "Model Town", 5, 420, "Bicycle", "LQ-69", "03314950730", "bilal@gmail.com", "eea47b3330de77a619aee4ff3bb8ecbd275aad593dce3b1da72ac024c1dafb0c","Other", "PK89HBLT5050358099709876", NULL);
INSERT INTO rider VALUES(NULL, "Samee", NULL, "Arif", "Karachi", "Sea view", 3, 24, "Car", "LE-7171", "03244957700", "samee@gmail.com", "360bf3a8254ab93fc69e84ce6640d78535a34f3cdc0b1bdacec6ccdd93726a79","Male", "PK71UBLT5050058099693523", NULL);
INSERT INTO rider VALUES(NULL, "Mustafa", NULL, "Sidiqui", "Faisalabad", "Defence", 8, 34, "Motorcycle", "LEF-8197", "03004958800", "mutafa@gmail.com", "4d95e550b47c0122b96cf2a846ab3ae30759457fdd3a719a7e47ad5e7d269379","Male", "PK51FSBL5050358099703523", NULL);
INSERT INTO rider VALUES(NULL, "Hafsa", NULL, "Khan", "Islamabad", "Defence", 15, 8, "Car", "LEA-8097", "03518875963", "khan@gmail.com", "deb00b50f5619bdc04881c507456ea4d32c7f6760acc3f9c1ae60c722e738136","Female", "PK11SKLE5050357799703523", NULL);

INSERT INTO orders VALUES(1, 1, 2, 1, "Delivered", 450, 5.0, '2021-04-03 14:00:45', '2021-04-03 14:30:45');
INSERT INTO orders VALUES(NULL, 3, 2, 3, "Delivered", 650, 4.2, '2021-07-14 17:00:16', '2021-07-14 17:55:45');
INSERT INTO orders VALUES(NULL, 3, 1, 5, "Delivered", 699, 1.5, '2021-11-03 14:00:45', '2021-11-03 14:30:16');
INSERT INTO orders VALUES(NULL, 2, 5, 2, "Delivered", 788, 4.0, '2021-10-21 13:35:52', '2021-10-21 14:45:12');
INSERT INTO orders VALUES(NULL, 4, 4, 2, "Delivered", 1012, 3.5, '2021-04-03 14:00:45', '2021-04-03 14:30:45');
INSERT INTO orders VALUES(NULL, 5, 3, 2, "Cancelled", 920, 2.5, '2021-05-18 14:16:45', '2021-05-18 14:55:45');

INSERT INTO phone VALUES ("03326677133", 1);
INSERT INTO phone VALUES ("03322217133", 2);
INSERT INTO phone VALUES ("03326611533", 3);
INSERT INTO phone VALUES ("03521677133", 4);
INSERT INTO phone VALUES ("03112377133", 5);

INSERT INTO delivery_radius VALUES (1, "Lahore", "Defence");
INSERT INTO delivery_radius VALUES (1, "Lahore", "Gulberg");
INSERT INTO delivery_radius VALUES (2, "Karachi", "Sea View");
INSERT INTO delivery_radius VALUES (3, "Faisalabad", "Johar Town");
INSERT INTO delivery_radius VALUES (4, "Quetta", "Defence");
INSERT INTO delivery_radius VALUES (5, "Sialkot", "Model Town");

INSERT INTO item VALUES (1, "Burger", 500, "Fast Food", NULL, "Good burger");
INSERT INTO item VALUES (1, "Chicken leg", 250, "Desi", NULL, "Bad BBQ");
INSERT INTO item VALUES (2, "Garlic Chicken", 650, "Chinese", NULL, "Okayish Chinese");
INSERT INTO item VALUES (3, "Shawarma", 420, "Arabic", NULL, "Good Shawarma");
INSERT INTO item VALUES (4, "Pasta", 550, "Italian", NULL, "Best Pasta");
INSERT INTO item VALUES (5, "Pizza Xtreme", 1500, "Fast Food", NULL, "Best Pizza");

INSERT INTO credit_card VALUES (123456789123, 1, 123, 12, 2020, "Visa");
INSERT INTO credit_card VALUES (123451711123, 2, 213, 01, 2023, "Master");
INSERT INTO credit_card VALUES (121222554423, 3, 451, 05, 2024, "Visa");
INSERT INTO credit_card VALUES (155556781123, 4, 981, 07, 2026, "Visa");
INSERT INTO credit_card VALUES (123427666623, 5, 551, 11, 2019, "Master");

INSERT INTO ordered_item VALUES (1, 1, "Burger", 2);
INSERT INTO ordered_item VALUES (1, 1, "Chicken leg", 2);
INSERT INTO ordered_item VALUES (2, 2, "Garlic Chicken", 5);
INSERT INTO ordered_item VALUES (3, 3, "Shawarma", 3);
INSERT INTO ordered_item VALUES (4, 4, "Pasta", 4);
INSERT INTO ordered_item VALUES (5, 5, "Pizza Xtreme", 2);

INSERT INTO transaction VALUES (1, 1, "Online", 123456789123);
INSERT INTO transaction VALUES (NULL, 2, "Cash", NULL);
INSERT INTO transaction VALUES (NULL, 3, "Online", 121222554423);
INSERT INTO transaction VALUES (NULL, 4, "Online", 155556781123);
INSERT INTO transaction VALUES (NULL, 5, "Cash", NULL);
