CREATE TABLE [dbo].[Policy_Status_log]
(
	[Id]  INT NOT NULL FOREIGN KEY REFERENCES Policy(Id),
	[ChangedBy] int not null,
	[ChangedTo] int not null,
	[DateAndTime] datetime not null
)

GO
CREATE CLUSTERED INDEX policyIndex ON [dbo].[Policy_Status_log](Id);