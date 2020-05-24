CREATE TABLE [dbo].[Request_Comments]
(
	[Id] INT NOT NULL Identity(1,1)  PRIMARY KEY,
	[RequestId] INT NOT NULL FOREIGN KEY REFERENCES Request(Id),
	[Comments] VarChar(1000),
	[CreatedBy] int
)
