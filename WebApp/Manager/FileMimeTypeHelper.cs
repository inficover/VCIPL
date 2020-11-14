using Common.Helper;
using Contract;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Auth;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Manager
{

    public class FileManager : IFileManager
    {
        private StorageCredentials storageCredentials;
        private CloudStorageAccount storageAccount;
        private CloudBlobClient blobClient;
        private CloudBlobContainer container;

        private readonly BlobSettings _blobSettings;

        public FileManager(IOptions<BlobSettings> blobSettings)
        {
            _blobSettings = blobSettings.Value;
            storageCredentials = new StorageCredentials(_blobSettings.accountName, _blobSettings.keyValue);
            storageAccount = new CloudStorageAccount(storageCredentials, true);
            blobClient = storageAccount.CreateCloudBlobClient();
            container = blobClient.GetContainerReference(_blobSettings.containerName);
        }
        public async Task<byte[]> RetreiveFile(string uniqueId, string contentType)
        {
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(uniqueId);
            blockBlob.Properties.ContentType = contentType;
            await blockBlob.FetchAttributesAsync();
            long fileByteLength = blockBlob.Properties.Length;
            byte[] output = new byte[fileByteLength];
            await blockBlob.DownloadToByteArrayAsync(output, 0);
            return output;
        }

        public async Task<string> UploadFile(byte[] file, string uniqueId, string contentType )
        {
            try
            {
                // Get the reference to the block blob from the container
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(uniqueId);

                // Upload the file
                blockBlob.Properties.ContentType = contentType;

                await blockBlob.UploadFromByteArrayAsync(file, 0, file.Length);

                return await Task.FromResult("upload success");
            }
            catch
            {
                return await Task.FromResult("upload failed");
            }
        }

        public async Task<string> DeleteFile(string uniqueId)
        {
            try
            {
                // Get the reference to the block blob from the container
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(uniqueId);

                await blockBlob.DeleteIfExistsAsync();

                return await Task.FromResult("delete success");
            }
            catch
            {
                return await Task.FromResult("delete failed");
            }
        }
    }

}
