CREATE TABLE [dbo].[SellPolicy_URL]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[SegmentId] INT NOT NULL FOREIGN KEY REFERENCES SellPolicy_Segment(Id),
	[PolicyTypeId] INT NOT NULL FOREIGN KEY REFERENCES SellPolicy_PolicyType(Id),
	[BusinessTypeId] INT NOT NULL FOREIGN KEY REFERENCES SellPolicy_BusinessType(Id),
	[RTO_Id] INT NOT NULL FOREIGN KEY REFERENCES SellPolicy_RTO(Id),
	[URL] varchar(200) not null
)

