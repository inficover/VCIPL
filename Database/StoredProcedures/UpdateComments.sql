CREATE PROCEDURE [dbo].[UpdateComments]
    @Id INT, 
    @RequestId INT,
    @Comments VARCHAR(1000),
    @CreatedBy INT
AS
	  BEGIN 
      UPDATE Request_Comments
	  SET    RequestId =  @RequestId ,
             Comments = @Comments,
             CreatedBy =  @CreatedBy
 WHERE  id = @Id; 

 select * from Request_Comments where RequestId = @RequestId;

END