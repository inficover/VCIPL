CREATE TABLE [dbo].[SellPolicy_BusinessType]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[PolicyTypeId] INT NOT NULL FOREIGN KEY REFERENCES SellPolicy_PolicyType(Id),
	[Name] varchar(50) not null
)
