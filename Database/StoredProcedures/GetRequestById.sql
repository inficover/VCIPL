CREATE PROCEDURE [dbo].[GetRequestById]
	@Id int
AS
BEGIN

	select * from dbo.[Request] where Id = @Id;

	select Id, DocumentName as Name, FileType , DocumentType as Type from Request_Documents where RequestId = @Id;

	select * from dbo.[Request_Comments] where RequestId = @Id;
END
