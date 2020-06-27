CREATE TABLE [dbo].[Variants]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[ModelId] INT FOREIGN KEY REFERENCES Models(Id),
	[Name] varchar(50) not null
)
