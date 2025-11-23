IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'midb')
create database midb;

go
use midb;
go
create table Customers(
Id int not null identity(1,1) primary key,
Name nvarchar(150),
Address nvarchar(150),
City nvarchar(150),
Region nvarchar(150),
PostalCode nvarchar(15),
Country nvarchar(150),
Phone nvarchar(10),
);
go
--Warehouses
create table Warehouses(
Id int identity(1,1) primary key,
Name nvarchar(150)
);
go
create table Products(
Id int identity(1,1) not null primary key,
Name nvarchar(150),
Price decimal(18,2),
Stock int not null,
IsActive bit,
CreatedAt datetime2,
CustomerId int foreign key references Customers(Id),
WarehousesId int foreign key references Warehouses(Id)
);
go

insert into Customers (Name, Address, City, Region, PostalCode, Country, Phone)
	values
		('Andr�s','Calle #5, Mar�a Antonia', 'Ban�','Regi�n sur','94000', 'Rep. Dom', '8093809980'),
		('Luisa P�rez','Av. Lope de Vega #123', 'Santo Domingo','Distrito Nacional','10101', 'Rep. Dom', '8495551234'),
		('Javier Sol�s','El Lim�n, Carretera #8', 'Saman�','Regi�n Nordeste','32000', 'Rep. Dom', '8294445678'),
		('Mar�a Rivas','Calle del Sol, Edif. 4B', 'Santiago','Regi�n Cibao','51000', 'Rep. Dom', '8093339012'),
		('Roberto G�mez','Calle Duarte, Esq. 27 Feb', 'La Romana','Regi�n Este','22000', 'Rep. Dom', '8492223456');
go
insert into Warehouses (Name)
    values
        ('Baní'),
        ('San Pedro de Macorís'),
        ('Santo Domingo'),
        ('Las charcas'),
        ('San Cristobal');
        go
insert into Products (Name, Price, Stock, IsActive, CreatedAt, CustomerId, WarehousesId)
values
    -- CustomerId = 1 (Andr�s)
    ('Smartphone X20', 850.50, 150, 1, GETDATE(), 1,1),
    
    -- CustomerId = 2 (Luisa P�rez)
    ('Laptop Ultrabook Pro', 1499.99, 50, 1, GETDATE(), 2,2),
    
    -- CustomerId = 3 (Javier Sol�s)
    ('Auriculares Bluetooth ZB-3', 45.99, 300, 1, GETDATE(), 3,3),
    
    -- CustomerId = 4 (Mar�a Rivas)
    ('Webcam HD 1080p', 75.00, 120, 1, GETDATE(), 4,4),
    
    -- CustomerId = 5 (Roberto G�mez)
    ('Teclado Mec�nico RGB', 99.99, 80, 1, GETDATE(), 5,5),
    
    -- CustomerId = 1 (Andr�s - segundo producto)
    ('Mouse Ergon�mico Inal�mbrico', 25.40, 220, 1, GETDATE(), 1,2),
    
    -- CustomerId = 2 (Luisa P�rez - segundo producto)
    ('Monitor Curvo 27"', 350.75, 65, 0, GETDATE(), 2,3);
go




