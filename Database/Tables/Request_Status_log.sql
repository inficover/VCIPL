CREATE TABLE [dbo].[Request_Status_log]
(
	[RequestId]  INT NOT NULL FOREIGN KEY REFERENCES Request(Id),
	[ChangedBy] int not null,
	[ChangedTo] int not null,
	[DateAndTime] datetime not null
)

GO
CREATE CLUSTERED INDEX requestIndex ON [dbo].[Request_Status_log](RequestId);