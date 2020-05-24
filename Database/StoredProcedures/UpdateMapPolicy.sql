CREATE PROCEDURE [dbo].[UpdateMapPolicy]
@Id int,
@RequestId int,
@PolicyId int,
@GrossValue int,
@NetValue int

AS
Begin

UPDATE  Request_Mapping SET RequestId = @RequestId,
                            PolicyId = @PolicyId,
                            GrossValue = @GrossValue,
                            NetValue = @NetValue

 WHERE  Id = @Id; 
end
