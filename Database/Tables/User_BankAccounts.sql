CREATE TABLE [dbo].[User_BankAccounts]
(
	[UserId] INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
	[NameInBank] varchar(100) not null,
	[AccountNumber] varchar(50) not null,
	[IFSCCode] varchar(50) not null,
	[BankName] varchar(50) not null
)
GO
CREATE CLUSTERED INDEX userBankAccountsIndex ON [dbo].[User_BankAccounts](UserId);

