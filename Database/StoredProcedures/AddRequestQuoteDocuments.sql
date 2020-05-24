CREATE PROCEDURE [dbo].[AddRequestQuoteDocuments]
	@RequestId INT,
	@DocumentName varchar(50),
	@DocumentType varchar(50),
	@DocumentData varbinary(max),
	@FileType varchar(50)
AS
begin 

update Request set Status = 4 where  Id =@RequestId;

insert into Request_Quote_Documents values (@RequestId, @DocumentName, @DocumentType, @DocumentData, @FileType);

end
