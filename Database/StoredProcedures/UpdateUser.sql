CREATE PROCEDURE [dbo].[Updateuser] @Id                       INT, 
                                    @UserName                 VARCHAR(50), 
                                    @Name                     VARCHAR(50), 

                                    --@Password varchar(50), 
                                    @MailId                   VARCHAR(50), 
                                    @Mobile                   VARCHAR(50), 
                                    @IsPasswordChangeRequired BIT, 
                                    @IsActive                 BIT, 
                                    @Status                   INT, 
                                    @Roles                    ROLESLIST readonly 
, 
                                    @BankAccounts             BANKACCOUNTS readonly,
                                    @Payout decimal(5,2)
 
AS 
  BEGIN 
      UPDATE users 
      SET    username = @UserName, 
             NAME = @Name, 
             --Password = @Password, 
             mailid = @MailId, 
             mobile = @Mobile, 
             ispasswordchangerequired = @IsPasswordChangeRequired, 
             isactive = @IsActive, 
             status = @Status,
             Payout = @Payout
      WHERE  id = @Id; 

      DELETE user_roles 
      WHERE  userid = @Id; 

      INSERT INTO user_roles 
                  (userid, 
                   roleid) 
      SELECT @Id, 
             id 
      FROM   @Roles; 

      --IF EXISTS(SELECT 1 
      --          FROM   user_bankaccounts 
      --          WHERE  userid = @Id) 
      --  BEGIN 
      --      UPDATE baseData 
      --      SET    NameInBank = currentData.nameinbank, 
      --             AccountNumber = currentData.accountnumber, 
      --             IFSCCode = currentData.ifsccode, 
      --             BankName = currentData.bankname 
      --      FROM   @BankAccounts currentData 
      --             JOIN user_bankaccounts baseData 
      --               ON currentData.userid = baseData.userid 
      --                  AND baseData.userid = @Id 
      --  END 
      --ELSE 
      --  BEGIN 
      --      INSERT INTO user_bankaccounts 
      --                  (userid, 
      --                   nameinbank, 
      --                   accountnumber, 
      --                   ifsccode, 
      --                   bankname) 
      --      SELECT @Id, 
      --             Isnull(nameinbank, ''), 
      --             Isnull(accountnumber, ''), 
      --             Isnull(ifsccode, ''), 
      --             Isnull(bankname, '') 
      --      FROM   @BankAccounts 
      --  END 

        MERGE user_bankaccounts AS TARGET
USING @BankAccounts AS SOURCE 
ON (TARGET.UserId= @Id) 
--When records are matched, update the records if there is any change
WHEN MATCHED
THEN UPDATE SET
TARGET.NameInBank = SOURCE.nameinbank, 
                   TARGET.AccountNumber = SOURCE.accountnumber, 
                   TARGET.IFSCCode = SOURCE.ifsccode, 
                   TARGET.BankName = SOURCE.bankname 
--When no records are matched, insert the incoming records from source table to target table
WHEN NOT MATCHED BY TARGET 
THEN INSERT (userid, 
              nameinbank, 
              accountnumber, 
              ifsccode, 
              bankname)  values (
            
             @Id, ISNULL(SOURCE.nameinbank, ''), 
             ISNULL(SOURCE.accountnumber, ''),
             ISNULL(SOURCE.ifsccode, ''), 
             ISNULL(SOURCE.bankname, '')
                 
          )
;

      EXEC Getuserandrolesbyid 
        @Id; 

      SELECT documentname AS NAME, 
             filetype 
      FROM   user_documents 
      WHERE  userid = @Id 
             AND documenttype = 'KYC' 

      SELECT * 
      FROM   user_bankaccounts 
      WHERE  userid = @Id 
  END 