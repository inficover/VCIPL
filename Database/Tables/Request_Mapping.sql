CREATE TABLE [dbo].[Request_Mapping]
(
	[Id] INT NOT NULL Identity(1,1)  PRIMARY KEY,
    [RequestId] INT NOT NULL FOREIGN KEY REFERENCES Request(Id),
	[PolicyId] int,
	[GrossValue] int,
	[NetValue] int
)
