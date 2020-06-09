CREATE PROCEDURE [dbo].[CheckPolicyNumber]
	@RequestId INT,
	@PolicyNumber varchar(50)
AS
Begin

select * from Policy where dbo.trim(lower(PolicyNumber)) = dbo.trim(lower(@PolicyNumber))

end