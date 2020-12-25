CREATE TABLE [dbo].[SellPolicy_RTO]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[BusinessTypeId] INT NOT NULL FOREIGN KEY REFERENCES SellPolicy_BusinessType(Id),
	[Name] varchar(50) not null
)

