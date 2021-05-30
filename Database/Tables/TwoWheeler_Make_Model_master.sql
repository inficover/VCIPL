CREATE TABLE [dbo].[TwoWheeler_Make_Model_master]
(
	[Id] INT NOT NULL PRIMARY KEY identity(1,1),
	[ModelCode] nvarchar(60) not null,
	[Make] nvarchar(100) not null,
	[ModelName] nvarchar(100) not null,
	[Insurers_id] INT NOT NULL references Insurers(id)

)
