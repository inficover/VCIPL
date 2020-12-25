CREATE PROCEDURE [dbo].[SellPolicy_UpdateLink]
@Id int,
@NewUrl varchar(1000)
AS
BEGIN
	update SellPolicy_URL set url = @NewUrl  where Id = @Id
END

