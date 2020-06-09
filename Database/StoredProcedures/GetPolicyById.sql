CREATE PROCEDURE [dbo].[GetPolicyById]
	@Id int
AS
BEGIN

	select * from dbo.[policy] where Id = @Id;

	select Id, DocumentName as Name, FileType , DocumentType as Type from Policy_Documents where PolicyId = @Id;

	select * from dbo.[policy_Comments] where PolicyId = @Id;
END
