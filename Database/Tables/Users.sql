CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[UserName] varchar(50) not null,
	[Password] varchar(50) not null,
	[MailId] varchar(50) not null,
	[Mobile] varchar(50) not null,
	[CreatedBy] INT NULL FOREIGN KEY REFERENCES Users(Id),
	[IsPasswordChangeRequired] bit NOT NULL DEFAULT 0, 
    [IsActive] BIT NULL DEFAULT 1, 
    [Status] INT NULL FOREIGN KEY REFERENCES UserStatus(Id), 
    [Name] VARCHAR(50) NULL, 
    [Payout] DECIMAL(5, 2) NULL
)
