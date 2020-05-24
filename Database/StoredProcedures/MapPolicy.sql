CREATE PROCEDURE [dbo].[MapPolicy]
@Id int,
@RequestId int,
@PolicyId int,
@GrossValue int,
@NetValue int

AS
Begin

Declare @Generatedid int;
insert into  Request_Mapping (RequestId,PolicyId,GrossValue,NetValue) values (@RequestId,@PolicyId,@GrossValue,@NetValue );

select * from Request_Mapping where RequestId = @RequestId;
end
