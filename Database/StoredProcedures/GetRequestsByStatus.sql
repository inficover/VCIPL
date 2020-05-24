CREATE PROCEDURE [dbo].[GetRequestsByStatus]
	@Status int
AS
BEGIN
	select r.*, rp.id as RequestMapID from dbo.[Request] r left join dbo.[Request_Mapping] rp 
	on r.id = rp.RequestId
	where Status = @Status;

END
