CREATE PROCEDURE [dbo].[GetPolicyById]
	@Id int
AS
BEGIN

	select *, pc.Comments from dbo.[policy] p join dbo.[policy_Comments]  pc on p.Id = pc.PolicyId where p.Id = @Id;

	select Id, DocumentName as Name, FileType , DocumentType as Type from Policy_Documents where PolicyId = @Id;

END
