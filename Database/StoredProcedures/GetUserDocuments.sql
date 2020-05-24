CREATE PROCEDURE [dbo].[GetUserDocuments]
	@UserId INT,
	@DocumentName varchar(50)
AS
begin 
select UserId, DocumentName as Name,DocumentType as Type, DocumentData as Data , FileType
from User_Documents where UserId= @UserId and DocumentName = @DocumentName;
end
