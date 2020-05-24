CREATE PROCEDURE [dbo].[GetUserAndRolesById]
	@Id int
AS
begin
select * from dbo.[Users] where Id = @Id;

select roles.Id, roles.RoleName from dbo.[User_Roles] userRoles join Roles roles on roles.Id = userRoles.RoleId 
where UserId = @Id;
end
