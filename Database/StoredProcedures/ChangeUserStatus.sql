CREATE PROCEDURE [dbo].[ChangeUserStatus]
	@UserId int,
	@Status int
AS
BEGIN
update Users set Status = @Status where Id = @UserId;
END