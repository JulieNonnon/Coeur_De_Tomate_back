-- -- SCRIPT BDD COEUR DE TOMATE


CREATE DATABASE coeurdetomate

DROP TABLE IF EXISTS adress CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "order" CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS contenir CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS categoriser CASCADE;

CREATE TABLE adress (
adress_id SERIAL PRIMARY KEY, 
streetnbr INT NOT NULL, 
streetname VARCHAR(180) NOT NULL, 
details VARCHAR(180) NULL, 
postalcode VARCHAR(180) NOT NULL, 
city VARCHAR(180) NOT NULL, 
country VARCHAR(180) NOT NULL
);

CREATE TABLE "user" (
user_id SERIAL PRIMARY KEY, 
name VARCHAR(180) NOT NULL, 
email VARCHAR(180) NOT NULL, 
password VARCHAR(180) NOT NULL, 
role VARCHAR(50) NOT NULL, 
adress_id INT, 
CONSTRAINT fk_adress_id FOREIGN KEY (adress_id) REFERENCES adress (adress_id)
);

CREATE TABLE "order" (
order_id SERIAL PRIMARY KEY, 
order_date DATE NOT NULL, 
order_status VARCHAR(180) NOT NULL, 
user_id INT NOT NULL, 
CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "user" (user_id)
);

CREATE TABLE product (
product_id SERIAL PRIMARY KEY, 
title VARCHAR(180) NOT NULL, 
image VARCHAR(180) NOT NULL, 
small_description VARCHAR(180) NOT NULL, 
long_description VARCHAR(255) NOT NULL, 
price NUMERIC(5, 2) NOT NULL, 
pitch VARCHAR(180) NOT NULL, 
feature1 VARCHAR(255) NOT NULL, 
feature2 VARCHAR(255) NOT NULL, 
feature3 VARCHAR(255) NOT NULL
);

CREATE TABLE contenir (
order_id INT NOT NULL, 
product_id INT NOT NULL,
quantite INT NOT NULL, 
PRIMARY KEY (order_id , product_id),
CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES "order" (order_id),
CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES product (product_id)
);

CREATE TABLE category (
category_id SERIAL PRIMARY KEY,
category_name VARCHAR(180) NOT NULL
);

CREATE TABLE categoriser (
product_id INT NOT NULL, 
category_id INT NOT NULL, 
PRIMARY KEY (product_id , category_id),
CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES product (product_id),
CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category (category_id)
);


-- -- TEST 
-- -- INSERT INTO product (title, image, small_description, long_description, price, pitch, feature1, feature2, feature3) VALUES ('Tomate Placeholder', 'https://ibb.co/8XtF7Hc', 'This is a small description.', 'This is a long description.', 2, 'Check out this rad tomato !', 'It is red.', 'It is round.', 'It is tasty af.');

