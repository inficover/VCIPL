CREATE PROCEDURE [dbo].[GetAllKycPendingUsers]
AS
begin


select * from dbo.[Users] where Status = 3

end
