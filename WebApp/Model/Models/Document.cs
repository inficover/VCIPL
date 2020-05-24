using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
    [Serializable]
    public class Document
    {
        public int UserId { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public string FileType { get; set; }

        public string DataAsBase64 { get; set; }

        public byte[] Data { get; set; }

    }
}
