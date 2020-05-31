CREATE TABLE [dbo].[Models]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[MakeId] INT FOREIGN KEY REFERENCES Makes(Id),
	[Name] varchar(50) not null
)
