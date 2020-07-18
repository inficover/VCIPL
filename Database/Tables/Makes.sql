CREATE TABLE [dbo].[Makes]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[VehiclesTypeId] INT FOREIGN KEY REFERENCES VehiclesType(Id),
	[Name] varchar(50) not null
)
