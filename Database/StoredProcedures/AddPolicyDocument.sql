CREATE PROCEDURE [dbo].[AddPolicyDocument]
	@PolicyId INT,
	@DocumentName varchar(50),
	@DocumentType varchar(50),
	@DocumentData varbinary(max),
	@FileType varchar(50)
AS
begin 

	insert into Policy_Documents values (@PolicyId, @DocumentName, @DocumentType, @DocumentData, @FileType);

	SELECT CAST(SCOPE_IDENTITY() as int) AS [SCOPE_IDENTITY];  

end
