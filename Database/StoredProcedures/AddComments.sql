CREATE PROCEDURE [dbo].[AddComments]
	@RequestId int,
	@Comments varchar(1000),
	@CreatedBy int
AS
Begin

Declare @Generatedid int;
insert into  dbo.[Request_Comments] (
	[RequestId],
	[Comments],
	[CreatedBy]	
) values (
  @RequestId,
  @Comments,
  @CreatedBy 
)

select * from Request_Comments where RequestId = @RequestId;

end

