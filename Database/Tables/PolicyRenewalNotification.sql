CREATE TABLE [dbo].[PolicyRenewalNotification]
(
	[Id] INT NOT NULL Identity(1,1)  PRIMARY KEY,
	[PolicyId] INT NOT NULL FOREIGN KEY REFERENCES Policy(Id),
	[CreatedDate] date,
	[LastUpdatedDate] date,
	[Status] INT NOT NULL FOREIGN KEY REFERENCES PolicyRenewalNotificationStatus(Id),
)
