CREATE PROCEDURE [dbo].[ChangeRequestStatus]
	@RequestId int,
	@Status int,
	@UserId int
AS
BEGIN
update Request set Status = @Status where Id = @RequestId;

if @Status <> 1
begin
insert into Request_Status_log  values (@RequestId,@UserId,@Status,GETDATE());
end
END