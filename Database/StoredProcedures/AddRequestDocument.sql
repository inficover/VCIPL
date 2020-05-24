CREATE PROCEDURE [dbo].[AddRequestDocument]
	@RequestId INT,
	@DocumentName varchar(50),
	@DocumentType varchar(50),
	@DocumentData varbinary(max),
	@FileType varchar(50)
AS
begin 
--if exists(select 1 from Request_Documents where RequestId= RequestId and DocumentName = @DocumentName) 
--begin
--update Request_Documents set DocumentType = @DocumentType, DocumentData = @DocumentData, FileType = @FileType where 
--RequestId= @RequestId and DocumentName = @DocumentName
--end
--else
--begin
--if(@DocumentType = 'Payment')
--begin
--update Request set Status = 3 where  Id = @RequestId;
--end

--if(@DocumentType = 'Quote')
--begin
--update Request set Status = 4 where  Id = @RequestId;
--end

insert into Request_Documents values (@RequestId, @DocumentName, @DocumentType, @DocumentData, @FileType);
-- to return document id created
SELECT CAST(SCOPE_IDENTITY() as int) AS [SCOPE_IDENTITY];  
--end
end
