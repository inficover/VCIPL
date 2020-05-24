using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
    [Serializable]
    public class RequestDocument
    {
        public int Id { get; set; }
        public int RequestId { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public string FileType { get; set; }

        public string DataAsBase64 { get; set; }

        public byte[] Data { get; set; }

    }
}
