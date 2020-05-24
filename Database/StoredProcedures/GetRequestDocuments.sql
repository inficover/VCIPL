CREATE PROCEDURE [dbo].[GetRequestDocuments]
	@RequestId INT,
	@DocumentId INT
AS
begin 
select RequestId, DocumentName as Name,DocumentType as Type, DocumentData as Data , FileType
from Request_Documents where RequestId= @RequestId and Id = @DocumentId;
end
