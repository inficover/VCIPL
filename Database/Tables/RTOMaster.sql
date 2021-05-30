CREATE TABLE [dbo].[RTOMaster]
(
	[Id] INT NOT NULL PRIMARY KEY identity(1,1), 
    [RTO_NAME] NCHAR(200) NOT NULL, 
    [CITY_NAME] NCHAR(200) NOT NULL, 
    [STATE_NAME] NCHAR(200) NOT NULL, 
    [Insurers_id] INT NOT NULL references Insurers(id)
)
