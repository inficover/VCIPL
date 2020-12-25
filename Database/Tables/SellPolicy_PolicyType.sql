CREATE TABLE [dbo].[SellPolicy_PolicyType]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[SegmentId] INT NOT NULL FOREIGN KEY REFERENCES SellPolicy_Segment(Id),
	[Name] varchar(50) not null
)
