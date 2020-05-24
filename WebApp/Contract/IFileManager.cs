using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract
{
    public interface IFileManager
    {

        Task<string> UploadFile(byte[] file, string uniqueId, string contentType);

        Task<byte[]> RetreiveFile(string identifier, string contentType);

        Task<string> DeleteFile(string uniqueId);
    }
}
