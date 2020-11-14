CREATE TABLE [dbo].[UserPayoutEntry]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[UserId] INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
	[Amount] decimal,
	[TransactionId] varchar(100),
	[TransactionComments] varchar(100),
	[TransactionType] varchar(20),
	[TransactionDate] date,
)
