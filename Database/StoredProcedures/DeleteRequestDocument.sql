CREATE PROCEDURE [dbo].[DeleteRequestDocument]
	@RequestId INT,
	@DocumentId varchar(100)
	
AS
begin 

delete from Request_Documents where Id = @DocumentId and RequestId = @RequestId

end
