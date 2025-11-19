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
create table Products(
Id int identity(1,1) not null primary key,
Name nvarchar(150),
Price decimal(18,2),
Stock int not null,
IsActive bit,
CreatedAt datetime2,
CustomerId int foreign key references Customers(Id)
);
go

insert into Customers (Name, Address, City, Region, PostalCode, Country, Phone)
	values
		('Andrés','Calle #5, María Antonia', 'Baní','Región sur','94000', 'Rep. Dom', '8093809980'),
		('Luisa Pérez','Av. Lope de Vega #123', 'Santo Domingo','Distrito Nacional','10101', 'Rep. Dom', '8495551234'),
		('Javier Solís','El Limón, Carretera #8', 'Samaná','Región Nordeste','32000', 'Rep. Dom', '8294445678'),
		('María Rivas','Calle del Sol, Edif. 4B', 'Santiago','Región Cibao','51000', 'Rep. Dom', '8093339012'),
		('Roberto Gómez','Calle Duarte, Esq. 27 Feb', 'La Romana','Región Este','22000', 'Rep. Dom', '8492223456');
go
insert into Products (Name, Price, Stock, IsActive, CreatedAt, CustomerId)
values
    -- CustomerId = 1 (Andrés)
    ('Smartphone X20', 850.50, 150, 1, GETDATE(), 1),
    
    -- CustomerId = 2 (Luisa Pérez)
    ('Laptop Ultrabook Pro', 1499.99, 50, 1, GETDATE(), 2),
    
    -- CustomerId = 3 (Javier Solís)
    ('Auriculares Bluetooth ZB-3', 45.99, 300, 1, GETDATE(), 3),
    
    -- CustomerId = 4 (María Rivas)
    ('Webcam HD 1080p', 75.00, 120, 1, GETDATE(), 4),
    
    -- CustomerId = 5 (Roberto Gómez)
    ('Teclado Mecánico RGB', 99.99, 80, 1, GETDATE(), 5),
    
    -- CustomerId = 1 (Andrés - segundo producto)
    ('Mouse Ergonómico Inalámbrico', 25.40, 220, 1, GETDATE(), 1),
    
    -- CustomerId = 2 (Luisa Pérez - segundo producto)
    ('Monitor Curvo 27"', 350.75, 65, 0, GETDATE(), 2);
go


