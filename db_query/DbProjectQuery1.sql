use restaurent_management;

-- Create database
create table Food(
	FoodID int Not null Primary Key auto_increment,
	name varchar(25) not null,
	price float not null
);

create table Shipper (
	ShipperID int not null Primary Key auto_increment,
	name varchar(25) not null,
	PhoneNumber varchar(15) not null unique
);

create Table Customer (
	CustomerID int not null Primary key auto_increment,
	name varchar(25) not null,
	PhoneNumber varchar(15) not null unique,
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

CREATE TABLE DeletedCustomer (
	CustomerID int NOT NULL PRIMARY KEY,
	name varchar(25) NOT NULL,
	PhoneNumber varchar(15) NOT NULL,
    Address varchar(50),
	rank_member varchar(20) DEFAULT 'bronze'
);



-- Insert the sample
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

INSERT INTO Shipper (ShipperID, name, PhoneNumber) VALUES
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
#define MAX_NAME_LENGTH 50
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
select concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address from Customer;

-- count the number of customer
select count(CustomerID) as Number_of_customer from customer;

-- add new customer
insert into customer (name, PhoneNumber, Address) values
('Customer_Name', 'Customer_PhoneNumber', 'Customer_Address');

-- search customer by name:
select concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID, name, PhoneNumber, Address
from customer where name like '%Input%';

-- List all customer and total money they spend
select concat(case when C.CustomerID < 10 then 'S0' else 'S' end, C.CustomerID) as CustomerID, C.name, PhoneNumber, Address,count(OD.OrderID) as Total_Order, round(sum(FS.Quantity*F.price),2) as Total_Spend
from Customer as C Join Orders OD on C.CustomerID = OD.CustomerID
Join Food_order_supply FS on OD.OrderID = FS.OrderID
Join Food F on F.FoodID = FS.FoodID
group by C.CustomerID, C.name
order by Total_Spend desc;

-- Create DeletedCustomer tablle to save deleted customer

DELIMITER $$

CREATE TRIGGER tg_DeletedCustomer
BEFORE DELETE
ON Customer FOR EACH ROW
BEGIN
    INSERT INTO DeletedCustomer
    VALUES(OLD.CustomerID,OLD.name,OLD.PhoneNumber,OLD.Address,OlD.rank_member);
END$$    

DELIMITER ;

-- Create procedure to delete Customer
DELIMITER //

CREATE PROCEDURE DeleteCustomer(IN CID int)
BEGIN
	delete from food_order_supply where OrderID in (select OrderID From orders where CustomerID = CID);
	delete from orders where CustomerID = CID;
	delete from customer where CustomerID = CID;
END //

DELIMITER ;

-- Trigger for insert on table Orders to update rank member in customers
DELIMITER $$
CREATE TRIGGER set_customer_rank
AFTER INSERT ON food_order_supply
FOR EACH ROW
BEGIN
    DECLARE total_money FLOAT;
    DECLARE CID INT;
    SELECT CustomerID 
    INTO CID
    FROM Orders WHERE OrderID = NEW.OrderID;
    
    SELECT SUM(price * Quantity)
    INTO total_money
    FROM Food_order_supply JOIN Food ON Food_order_supply.FoodID = Food.FoodID
    WHERE OrderID IN (SELECT OrderID FROM Orders WHERE CustomerID = CID);
    
    IF( total_money > 300) THEN
        UPDATE Customer SET rank_member = 'gold' WHERE CustomerID = CID;
	elseif (total_money > 100) then 
		update Customer Set rank_member = 'silver' where CustomerID = CID;
	else 
		update Customer Set rank_member = 'bronze' where CustomerID = CID;
    END IF;
END$$

DELIMITER ;



-- ----------- SHIPPER -------------
-- Select all shipper information
select concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, name, PhoneNumber from Shipper;

-- count number of shipper
select count(ShipperID) as Number_of_Shipper from shipper;

-- add new shipper
insert into shipper (name, PhoneNumber) values
('Shipper_Name', 'Shipper_PhoneNumber');

-- search shipper by name
select concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, name, PhoneNumber
from shipper where name like '%Input%';

-- Search Shipper's Orders by name
select OD.OrderID, OD.Status from Shipper S join Orders OD on S.ShipperId = OD.ShipperID
where S.name like "%Input%";


-- --------- ORDER ----------
-- Select all order information
select concat(case when OrderID < 10 then 'Or0' else 'Or' end, OrderID) as OrderID,
concat(case when CustomerID < 10 then 'C0' else 'C' end, CustomerID) as CustomerID,
concat(case when ShipperID < 10 then 'S0' else 'S' end, ShipperID) as ShipperID, Status
from Orders;
-- Search Orders and total money by customer's name
select concat(case when OD.OrderID < 10 then 'Or0' else 'Or' end, OD.OrderID) as OrderID, round(sum(FD.Quantity * F.price),2) as Total from Customer C 
join Orders as OD on C.CustomerID = OD.CustomerID
join Food_order_supply FD on OD.OrderID = FD.OrderID
join Food F on FD.FoodID = F.FoodID
where C.name like "%Tai%"
group by OD.OrderID;

-- Total money of order
select concat(case when OD.OrderID < 10 then 'Or0' else 'Or' end, OD.OrderID) as OrderID, round(sum(FD.Quantity * F.price),2) as Total from Orders as OD 
join Food_order_supply FD on OD.OrderID = FD.OrderID
join Food F on FD.FoodID = F.FoodID
group by OD.OrderID
order by OD.OrderID;



-- count the number of orders:
select count(OrderID) as Number_of_orders from Orders;

-- Add new order:
insert into orders (CustomerID, ShipperID, Status) values
(CustomerID, ShipperID, 'Order_status');

insert into Food_order_supply (FoodID, Quantity) value 
(FoodID, Quantity);

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
Quantity from Food_order_supply;

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
from Food_order_supply 
group by FoodID order by Total_number desc;

-- add rank attribute in table customers
ALTER TABLE Customer
ADD rank_member varchar(20) DEFAULT 'bronze';









