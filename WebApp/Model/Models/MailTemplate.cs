using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
    public class MailTemplate
    {
        public Email To { get; set; }

        public Email From { get; set; }

        public string Subject { get; set; }

        public string TextContent { get; set; }

        public string HtmlContent { get; set; }
    }

    public class Email
    {
        public string MailId { get; set; }

        public string Name { get; set; }

    }
}
