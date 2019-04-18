DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10, 2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

insert into products (product_name,department_name,price,stock_quantity) values ("Copper Ore","Crafting Reagents",3.50,60);
insert into products (product_name,department_name,price,stock_quantity) values ("Titanium Ore","Crafting Reagents",10,80);
insert into products (product_name,department_name,price,stock_quantity) values ("Linen Cloth","Crafting Reagents",2,100);
insert into products (product_name,department_name,price,stock_quantity) values ("Thunderfury (sword)","Weapons",5000,1);
insert into products (product_name,department_name,price,stock_quantity) values ("Arcanite Reaper","Weapons",1000,3);
insert into products (product_name,department_name,price,stock_quantity) values ("Heartseeker","Weapons",800,5);
insert into products (product_name,department_name,price,stock_quantity) values ("Ace of Storms","Cards",500,5);
insert into products (product_name,department_name,price,stock_quantity) values ("Eight of Storms","Cards",500,3);
insert into products (product_name,department_name,price,stock_quantity) values ("Five of Storms","Cards",500,2);
insert into products (product_name,department_name,price,stock_quantity) values ("Reins of the Astral Cloud Serpent","Mount",4000,1);
