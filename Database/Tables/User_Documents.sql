CREATE TABLE [dbo].[User_Documents]
(
	[UserId] INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
	[DocumentName] varchar(50) not null,
	[DocumentType] varchar(50),
	[DocumentData] varbinary(max), 
    [FileType] VARCHAR(50) NULL
)
GO
CREATE CLUSTERED INDEX userDocumentIndex ON [dbo].[User_Documents](UserId);
