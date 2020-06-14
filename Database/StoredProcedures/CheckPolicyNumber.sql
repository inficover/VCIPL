CREATE PROCEDURE [dbo].[CheckPolicyNumber]
	@PolicyId INT,
	@PolicyNumber varchar(50)
AS
Begin

select * from Policy where lower(PolicyNumber) = lower(@PolicyNumber)

end