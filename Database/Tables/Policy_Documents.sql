CREATE TABLE [dbo].[Policy_Documents]
(
	[Id] INT NOT NULL Identity(1,1)  PRIMARY KEY,
	[PolicyId] INT NOT NULL FOREIGN KEY REFERENCES Policy(Id),
	[DocumentName] varchar(50) not null,
	[DocumentType] varchar(50),
	-- [DocumentData] varbinary(max), 
    [FileType] VARCHAR(50) NULL
)

GO
