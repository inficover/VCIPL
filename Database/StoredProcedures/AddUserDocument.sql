CREATE PROCEDURE [dbo].[AddUserDocument]
	@UserId INT,
	@DocumentName varchar(50),
	@DocumentType varchar(50),
	@DocumentData varbinary(max),
	@FileType varchar(100)
AS
begin 
if exists(select 1 from User_Documents where UserId= @UserId and DocumentName = @DocumentName) 
begin
update User_Documents set DocumentType = @DocumentType, DocumentData = @DocumentData, FileType = @FileType where 
UserId= @UserId and DocumentName = @DocumentName
end
else
begin
insert into User_Documents values (@UserId, @DocumentName, @DocumentType, @DocumentData, @FileType);
end
end
