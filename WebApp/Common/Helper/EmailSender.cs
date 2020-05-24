using Model.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Common.Helper
{
    public class EmailSender
    {
        private string apiKey;

        public EmailSender(string apiKey)
        {
            this.apiKey = apiKey;
        }
        public async Task<Response> SendEmailAsync(MailTemplate mailTemplate)
        {
            var client = new SendGridClient(this.apiKey);
            var fromEmail = mailTemplate.From;
            var toEmail = mailTemplate.To;
            var from = new EmailAddress(fromEmail.MailId, fromEmail.Name);
            var subject = mailTemplate.Subject;
            var to = new EmailAddress(toEmail.MailId, toEmail.Name);
            var plainTextContent = mailTemplate.TextContent;
            var htmlContent = mailTemplate.HtmlContent;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return response;
        }
    }
}
