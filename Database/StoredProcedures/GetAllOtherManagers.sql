Create PROCEDURE [dbo].[GetAllOtherManagers]
	@userId int
AS
begin

declare @parentId int;
declare @currenRole int;

select @currenRole = roleid from User_Roles where UserId = @userId
 
select @parentId = CreatedBy from Users where id = @userId

select u.id as Value, u.Name as DisplayName from dbo.[Users] u 
inner join dbo.[User_Roles] r 
on u.id = r.UserId 
where r.RoleId < @currenRole
and u.id <> @parentId


end
