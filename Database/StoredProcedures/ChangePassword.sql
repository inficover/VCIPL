CREATE PROCEDURE [dbo].[ChangePassword]
	@UserId int,
	@OldPassword varchar(50),
	@Newpassword varchar(50)
AS
BEGIN
Update Users set Password = @Newpassword, IsPasswordChangeRequired = 0 where Id = @UserId;
END
