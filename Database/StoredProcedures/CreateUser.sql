CREATE PROCEDURE [dbo].[CreateUser]
	@UserName varchar(50),
	@Name varchar(50),
	@Password varchar(50),
	@MailId varchar(50),
	@Mobile varchar(50),
	@CreatedBy int,
	@IsPasswordChangeRequired bit,
	@IsActive bit,
	@Status int,
	@roles RolesList Readonly,
	@Payout decimal(5,2)
AS
Begin
DECLARE @IdTable table(InsertedId int); 
declare @Id int;

IF EXISTS (SELECT 1 FROM dbo.[Users] WHERE MailId = @MailId) 
BEGIN
   THROW 51000, 'Email already exist.' , 0;
   RETURN 
END

IF EXISTS (SELECT 1 FROM dbo.[Users] WHERE  Mobile = @Mobile) 
BEGIN
   THROW 51000, 'Phone Number already exist.', 0;
   RETURN 
END

IF EXISTS (SELECT 1 FROM dbo.[Users] WHERE  USERNAME = @UserName) 
BEGIN
   THROW 51000, 'User Name already exist. usea different one', 0;
   RETURN 
END

insert into dbo.[Users] (UserName,Name,Password,MailId,Mobile, CreatedBy, IsPasswordChangeRequired, IsActive, Status, Payout) Output inserted.Id into @IdTable values (
@UserName,@Name, @Password, @MailId, @Mobile, @CreatedBy, @IsPasswordChangeRequired, @IsActive, @Status, @Payout
);
select @Id=InsertedId from @IdTable;

insert into User_Roles (UserId, RoleId) select @Id, Id from @roles; 


exec GetUserAndRolesById @Id;

end
