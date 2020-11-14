CREATE PROCEDURE [dbo].[GetUserHierarchyById]

	@Id int
AS
begin
; with  CTE as 
        (
        select  id
        ,       CreatedBy
        ,       UserName
        ,       0 as level
        from    Users
        where  id = @Id
        union all
        select  child.id
        ,       child.CreatedBy
        ,       child.UserName
        ,       level + 1
        from    Users child
        join    CTE parent
        on      child.CreatedBy = parent.id
        )
select  *
from    CTE

end