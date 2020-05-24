CREATE PROCEDURE [dbo].[GetMapPolicyById]
	@Id int
AS
BEGIN
	select * from dbo.[Request_Mapping] where Id = @Id;
END
