using Model;
using Model.Entities;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository
{
    public interface IDocumentRepository
    {
       Task<List<Document>> GetDocumentsByUserId(int userID, string documentName);

       Task<bool> AddDocuments(Document document);

    }
}
