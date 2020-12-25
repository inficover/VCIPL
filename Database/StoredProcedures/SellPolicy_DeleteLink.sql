CREATE PROCEDURE [dbo].[SellPolicy_DeleteLink]
@Id int
AS
BEGIN
	delete from SellPolicy_URL where Id = @Id
END

