CREATE PROCEDURE [dbo].[GetUserById]
	@Id int
	
AS
begin
declare @userId int;
declare @parentId int;

select @userId=Id, @parentId = CreatedBy from dbo.[Users] where Id = @Id

exec GetUserAndRolesById @userId;

select * from dbo.[Users] where Id = @parentId;

select DocumentName as Name, FileType from User_Documents where UserId = @userId and DocumentType = 'KYC'

select * from User_BankAccounts where UserId = @userId

end
