create database midb;
go
use midb;
go

create table Products(
Id int identity(1,1) not null primary key,
Name nvarchar(150),
Price decimal(18,2),
Stock int not null,
IsActive bit,
CreatedAt datetime2
);
go
insert into Products (Name, Price, Stock, IsActive,CreatedAt)
	values
		('Lavadora',35000.00,5,'true','2025-12-31'),
		('Nevera',25000.00,10,'true','2024-11-01' ),
		('Televisor',15000.00,7,'true','2023-09-16'),
		('Abanico',5000.00,2,'true','2021-10-12'),
		('Monitor',1000.00,1,'true','2018-5-20');
		go
