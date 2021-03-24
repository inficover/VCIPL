CREATE PROCEDURE [dbo].[UpdateUserBasicDetails]
                                    @Id                       INT, 
                                    @UserName                 VARCHAR(50), 
                                    -- @Password                 VARCHAR(50), 
                                    @Name                     VARCHAR(50), 
                                    @MailId                   VARCHAR(50), 
                                    @Mobile                   VARCHAR(50), 
                                    @IsPasswordChangeRequired BIT, 
                                    @IsActive                 BIT, 
                                    @Status                   INT, 
                                    @Roles                    ROLESLIST readonly , 
                                    @BankAccounts             BANKACCOUNTS readonly,
                                    @Payout decimal(5,2)
AS
Begin
declare @sql nvarchar (1000);

      UPDATE users 
      SET    username = @UserName, 
             -- Password = @Password,
             NAME = @Name, 
             mailid = @MailId, 
             mobile = @Mobile, 
             Payout = @Payout
      WHERE  id = @Id;


      DELETE user_roles 
      WHERE  userid = @Id; 

      INSERT INTO user_roles 
                  (userid, 
                   roleid) 
                   SELECT @Id, id 
                    FROM   @Roles; 
end

