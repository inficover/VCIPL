CREATE PROCEDURE [dbo].[GetUserBySearchTerm]
	@SearchTerm varchar(100)
AS
begin

select * from dbo.[Users] 
where UserName like '%' + @SearchTerm+ '%' OR  Name like '%' + @SearchTerm+ '%' or Mobile like '%' + @SearchTerm+ '%';


end
