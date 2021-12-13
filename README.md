# FoodSwings
Food ordering service.
Step1: Database initialization (only if first time)
Start mysql server: "systemctl start mysql"
Create FoodSwings DB: "CREATE DATABASE FoodSwingsDB;"
Select Database: "USE FoodSwingsDB;"
Run DDL.sql and DML.sql to populate database: "source <path>/DDL.sql" and "source <path>/DML.sql"

Step2: Start the server:
Run command "node server.js" in backend directory

Step3: Open web app in browser
Run command "npm run start" in frontend directory


Deliverable 2:
Significant feature updates:
  -> Browse restaurants
  -> View Vendor menu
  -> Add items to shopping cart
  -> View and remove items from shopping cart
  -> Json Web Token and authentication upon Login and Signup
