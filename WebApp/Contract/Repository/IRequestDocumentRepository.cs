using Model;
using Model.Entities;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository
{
    public interface IRequestDocumentRepository
    {
       Task<List<RequestDocument>> GetDocumentsByRequestId(int requestID, int documentId);

       Task<int> AddDocuments(RequestDocument document);

        Task<bool> DeleteRequestDocument(int requestId, int documentId);
        Task<List<RequestDocument>> GetAllRequestDocuments(int requestId, string documentType);

    }
}
