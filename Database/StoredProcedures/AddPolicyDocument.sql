CREATE PROCEDURE [dbo].[AddPolicyDocument]
	@PolicyId INT,
	@DocumentName varchar(50),
	@DocumentType varchar(50),
	@DocumentData varbinary(max),
	@FileType varchar(50)
AS
begin 

if not exists(select 1 from Policy_Documents where PolicyId = @PolicyId)
begin
	insert into Policy_Documents values (@PolicyId, @DocumentName, @DocumentType, @FileType);


	select PolicyId as Id, DocumentName as Name,DocumentType as Type, null as Data , FileType, null as DataAsBase64
from Policy_Documents where Id = CAST(SCOPE_IDENTITY() as int);
end

if exists(select 1 from Policy_Documents where PolicyId = @PolicyId)
begin

update Policy_Documents set DocumentName = @DocumentName, DocumentType = @DocumentType , FileType = @FileType where PolicyId = @PolicyId;

select PolicyId as Id, DocumentName as Name,DocumentType as Type, null as Data , FileType, null as DataAsBase64
from Policy_Documents where PolicyId = @PolicyId;

end
end
