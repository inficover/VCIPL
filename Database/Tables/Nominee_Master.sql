CREATE TABLE [dbo].[Nominee_Master]
(
	[Id] INT NOT NULL PRIMARY KEY identity(1,1),
	[Name] nvarchar(100) NOT NULL,
	[Insurers_id] INT NOT NULL references Insurers(id)
)
