CREATE PROCEDURE [dbo].[GetUserBySearchTerm]
	@SearchTerm varchar(100)
AS
begin

select * from dbo.[Users] u inner join [dbo].[User_Roles] r on u.id = r.userId 
where r.roleid not in (1,2) and (UserName like '%' + @SearchTerm+ '%' OR  Name like '%' + @SearchTerm+ '%' or Mobile like '%' + @SearchTerm+ '%');


end
