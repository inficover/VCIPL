using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.Policy
{
    [Serializable]
    public class Document
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public string FileType { get; set; }

        public string DataAsBase64 { get; set; }

        public byte[] Data { get; set; }
        public Object RawFile { get; set; }

    }
}
