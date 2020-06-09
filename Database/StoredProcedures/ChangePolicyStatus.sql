CREATE PROCEDURE [dbo].[ChangePolicyStatus]
	@Id int,
	@Status int,
	@UserId int
AS
BEGIN

update Policy set Status = @Status where Id = @Id;

if @Status <> 1
begin
insert into Policy_Status_log  values (@Id,@UserId,@Status,GETDATE());
end

END
