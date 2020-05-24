CREATE PROCEDURE [dbo].[GetUsersByCreataedBy]
	@UserId varchar(50)
AS
begin

select *,
(select count(*) from  dbo.[MyFunc](users.id)) as TotalReportees,
(select SUM(case when f.IsActive = 1 then 1 else 0 end) from  dbo.[MyFunc](users.id) f) as ActiveReportees,
(select count(*) from  dbo.[MyFunc](@UserId)) as TotalUsers,
(select count(*) from  dbo.[MyFunc](@UserId) where IsActive=1) as ActiveUsers
from users where createdby = @UserId


select * from dbo.[User_Roles] 
where UserId in  (select Id from dbo.[Users] where CreatedBy = @UserId)


end
