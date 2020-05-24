CREATE TYPE [dbo].[RequestComments] AS TABLE
(
	[RequestId] int,
	[Comment] VarChar(1000),
	[CreatedBy] int
)
