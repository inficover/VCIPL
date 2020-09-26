CREATE PROCEDURE [dbo].[RecordUserPayoutEntry]
    @Id INT, 
    @UserId INT,
    @Amount VARCHAR(1000),
    @TransactionId VARCHAR(20),
    @TransactionComments VARCHAR(100),
    @TransactionType VARCHAR(20)
AS

insert into UserPayoutEntry(UserId, TransactionComments, TransactionDate, TransactionId, TransactionType)
values (@UserId, @Amount, @TransactionComments, GETDATE(), @TransactionId, @TransactionType)

END