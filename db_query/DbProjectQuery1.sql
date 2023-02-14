create table Food(
	FoodID int Not null Primary Key auto_increment,
	name varchar(25) not null,
	price float not null
);

create table Shipper (
	ShipperID int not null Primary Key auto_increment,
	name varchar(25) not null,
	PhoneNumber varchar(15) not null
);

create Table Customer (
	CustomerID int not null Primary key auto_increment,
	name varchar(25) not null,
	PhoneNumber varchar(15) not null,
	Address varchar(50)
);

create table Orders (
	OrderID int not null Primary Key auto_increment,
	CustomerID int not null,
	ShipperId int not null,
	Status varchar(10),
    foreign key (CustomerID) references Customer (CustomerID),
    foreign key (ShipperID) references Shipper (ShipperID),
	Constraint Che_sta Check (Status = 'Done' or Status = 'Processing' or Status = 'Failed')	
);

create table Food_order_supply (
	FoodID int not null,
    foreign key (FoodID) references Food (FoodID),
	OrderID int not null,
    Foreign KEy (OrderID) references Orders(OrderID),
	Quantity int not null
);


INSERT INTO Customer (name, CustomerID, PhoneNumber, address) VALUES
('John Smith', 1, '555-555-5555', '123 Main St'),
('Jane Doe', 2, '555-555-5556', '456 Park Ave'),
('Bob Johnson', 3, '555-555-5557', '789 Elm St'),
('Samantha Williams', 4, '555-555-5558', '1011 Oak St'),
('Michael Brown', 5, '555-555-5559', '1213 Pine St'),
('Emily Davis', 6, '555-555-5560', '1415 Cedar St'),
('Jacob Miller', 7, '555-555-5561', '1617 Birch St'),
('Nicholas Garcia', 8, '555-555-5562', '1819 Maple St'),
('Mia Lee', 9, '555-555-5563', '2021 Cherry St'),
('Jacob Martinez', 10, '555-555-5564', '2223 Pine St'),
('Olivia Wilson', 11, '555-555-5565', '2425 Cedar St'),
('Ethan Moore', 12, '555-555-5566', '2627 Birch St'),
('Ava Taylor', 13, '555-555-5567', '2829 Maple St'),
('Isabella Anderson', 14, '555-555-5568', '3031 Cherry St'),
('Michael Thomas', 15, '555-555-5569', '3233 Pine St'),
('Madison Hernandez', 16, '555-555-5570', '3435 Cedar St'),
('Ethan Gonzalez', 17, '555-555-5571', '3637 Birch St'),
('Aria Rodriguez', 18, '555-555-5572', '3839 Maple St'),
('Avery Cook', 19, '555-555-5573', '4041 Cherry St'),
('Evelyn Moore', 20, '555-555-5574', '4243 Pine St');

INSERT INTO shipper (ShipperID, name, PhoneNumber) VALUES
(1, 'Tom Smith', '555-555-5575'),
(2, 'Mary Johnson', '555-555-5576'),
(3, 'Mike Williams', '555-555-5577'),
(4, 'Bill Jones', '555-555-5578'),
(5, 'Ashley Brown', '555-555-5579');

INSERT INTO Food (FoodID, name, price) VALUES
(1, 'Pizza', 12.99),
(2, 'Hamburger', 8.99),
(3, 'Fried Rice', 9.99),
(4, 'Spaghetti', 11.99),
(5, 'Sushi', 15.99),
(6, 'Steak', 22.99),
(7, 'Seafood Paella', 18.99),
(8, 'Lamb Chops', 25.99);



INSERT INTO Orders (OrderID, CustomerID, ShipperId, Status) VALUES
(1, 1, 1, 'Done'),
(2, 2, 2, 'Processing'),
(3, 3, 3, 'Failed'),
(4, 4, 4, 'Done'),
(5, 5, 5, 'Processing'),
(6, 6, 1, 'Done'),
(7, 7, 2, 'Processing'),
(8, 8, 3, 'Failed'),
(9, 9, 4, 'Done'),
(10, 10, 5, 'Processing'),
(11, 11, 1, 'Done'),
(12, 12, 2, 'Processing'),
(13, 13, 3, 'Failed'),
(14, 14, 4, 'Done'),
(15, 15, 5, 'Processing'),
(16, 16, 1, 'Done'),
(17, 17, 2, 'Processing'),
(18, 18, 3, 'Failed'),
(19, 19, 4, 'Done'),
(20, 20, 5, 'Processing');


INSERT INTO Food_order_supply (FoodID, OrderID, Quantity) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 3),
(4, 4, 2),
(5, 5, 1),
(6, 6, 2),
(7, 7, 3),
(8, 8, 2),
(1, 9, 1),
(2, 10, 2),
(3, 11, 3),
(4, 12, 2),
(5, 13, 1),
(6, 14, 2),
(7, 15, 3),
(8, 16, 2),
(1, 17, 1),
(2, 18, 2),
(3, 19, 3),
(4, 20, 2);

-- ---------- CUSTOMER ----------
-- Select all customer information
select concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address from customer;

-- count the number of customer
select count(CustomerID) as Number_of_customer from customer;

-- add new customer
insert into customer (name, PhoneNumber, Address) values
('Customer_Name', 'Customer_PhoneNumber', 'Customer_Address');

-- search customer by name:
select concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address
from customer where name like '%Input%';

-- ----------- SHIPPER -------------
-- Select all shipper information
select concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, name, PhoneNumber from shipper;

-- count number of shipper
select count(ShipperID) as Number_of_Shipper from shipper;

-- add new shipper
insert into shipper (name, PhoneNumber) values
('Shipper_Name', 'Shipper_PhoneNumber');

-- search shipper by name
select concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, name, PhoneNumber
from shipper where name like '%Input%';

-- --------- ORDER ----------
-- Select all order information
select concat(case when OrderID < 10 then 'Or0' else 'Or' end, OrderID) as OrderID,
concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID,
concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, Status
from orders;

-- count the number of orders:
select count(OrderID) as Number_of_orders from orders;

-- Add new order:
insert into orders (CustomerID, ShipperID, Status) values
(CustomerID, ShipperID, 'Order_status');


-- ------- FOOD --------
-- Select all food information
select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID, name, price from food;

-- count the number of food:
select count(FoodID) as Number_of_food from food;

-- add new food:
insert into food (name, price) values
('Food_name', Food_price);

-- Search food by name:
select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID, name, price
from food where name like '%Beef%';

-- List food order by price ascending
select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID, name, price
from food order by price asc;

-- List food order by price descending
select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID, name, price
from food order by price desc;

-- ---------- Food order supply --------
-- List all food orders:
select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID,
concat(case when OrderID < 10 then 'Or0' else 'Or' end, OrderID) as OrderID,
Quantity from food_order_supply;

-- Sort food order by quantity asc:
select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID,
concat(case when OrderID < 10 then 'Or0' else 'Or' end, OrderID) as OrderID,
Quantity from food_order_supply order by Quantity asc;

-- Sort food order by quantity desc:
select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID,
concat(case when OrderID < 10 then 'Or0' else 'Or' end, OrderID) as OrderID,
Quantity from food_order_supply order by Quantity desc;

-- Count the quantity per food:
select concat(case when FoodID < 10 then 'F0' else 'F' end, FoodID) as FoodID, sum(Quantity) as Total_number
from food_order_supply 
group by FoodID order by Total_number;


