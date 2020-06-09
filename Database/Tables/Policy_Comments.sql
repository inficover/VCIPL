CREATE TABLE [dbo].[Policy_Comments]
(
	[Id] INT NOT NULL Identity(1,1)  PRIMARY KEY,
	[PolicyId] INT NOT NULL FOREIGN KEY REFERENCES Policy(Id),
	[Comments] VarChar(1000),
	[CreatedBy] int
)
