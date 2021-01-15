CREATE PROCEDURE [dbo].[UpdatePolicyRenualNotoficationStatus]
@IdsList IntegersList readonly,
@Status int


AS
Begin

UPDATE  PolicyRenewalNotification SET Status = @Status, LastUpdatedDate = GETDATE()
WHERE  Id in (select id from @IdsList) 

end
