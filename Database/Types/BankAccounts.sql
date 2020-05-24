CREATE TYPE [dbo].[BankAccounts] AS TABLE
(
	UserId varchar(50),
	NameInBank varchar(100),
	AccountNumber varchar(50),
	IFSCCode varchar(50),
	BankName varchar(50)
)
