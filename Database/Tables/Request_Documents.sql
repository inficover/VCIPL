CREATE TABLE [dbo].[Request_Documents]
(
	[Id] INT NOT NULL Identity(1,1)  PRIMARY KEY,
	[RequestId] INT NOT NULL FOREIGN KEY REFERENCES Request(Id),
	[DocumentName] varchar(50) not null,
	[DocumentType] varchar(50),
	[DocumentData] varbinary(max), 
    [FileType] VARCHAR(50) NULL
)

GO
