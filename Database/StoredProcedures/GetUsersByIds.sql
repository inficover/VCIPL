CREATE PROCEDURE [dbo].[GetUsersByIds]
	@UserIDs IntegersList Readonly
AS
begin
  SELECT  * FROM    Users WHERE   Id IN (  SELECT Id FROM @UserIds )
end
