CREATE TABLE [dbo].[Policy_Payout]
(
	[Id] INT NOT NULL Identity(1,1)  PRIMARY KEY,
	[PolicyId] INT NOT NULL FOREIGN KEY REFERENCES Policy(Id),
	[CalOn] varChar(10),
	[PayInPercentage] decimal,
	[PayOutTo] INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
	[PayOutPercentage] decimal,
	[PayoutAmount] decimal,
	[PayoutComment] varChar(100),
	[Date] date,
)
