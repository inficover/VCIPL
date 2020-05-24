CREATE PROCEDURE [dbo].[GetRequestsByCreatedUser]
	@Id int
AS
BEGIN
	select r.*, rp.id as RequestMapID from dbo.[Request] r left join dbo.[Request_Mapping] rp 
	on r.id = rp.RequestId
	where createdBy = @Id;

END
