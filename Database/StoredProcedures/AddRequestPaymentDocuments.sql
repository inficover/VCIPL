CREATE PROCEDURE [dbo].[AddRequestPaymentDocuments]
	@RequestId INT,
	@DocumentName varchar(50),
	@DocumentType varchar(50),
	@DocumentData varbinary(max),
	@FileType varchar(50)
AS
begin 
update Request set Status = 3 where  Id = @RequestId;


insert into Request_PaymentLink_Docs values (@RequestId, @DocumentName, @DocumentType, @DocumentData, @FileType);

end
