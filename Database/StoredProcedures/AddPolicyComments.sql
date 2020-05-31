CREATE PROCEDURE [dbo].[AddPolicyComments]
	@PolicyId int,
	@Comments varchar(1000),
	@CreatedBy int
AS
Begin

Declare @Generatedid int;
insert into  dbo.[Policy_Comments] (
	[PolicyId],
	[Comments],
	[CreatedBy]	
) values (
  @PolicyId,
  @Comments,
  @CreatedBy 
)

select * from Policy_Comments where PolicyId = @PolicyId;

end

