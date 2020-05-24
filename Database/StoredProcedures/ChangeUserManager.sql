CREATE PROCEDURE [dbo].[ChangeUserManager]
	@UserId int,
	@ManagerId int
AS
BEGIN
update Users set CreatedBy = @ManagerId where Id = @UserId;
END