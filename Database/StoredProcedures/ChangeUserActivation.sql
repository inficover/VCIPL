CREATE PROCEDURE [dbo].[ChangeUserActivation]
	@UserId int,
	@IsActive bit
AS
BEGIN
update Users set IsActive = @IsActive where Id = @UserId;
END