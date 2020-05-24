using System;
using System.Collections.Generic;
using System.Text;
using Model;
using Model.Models;
using System.Threading.Tasks;

namespace Contract
{
    public interface IRequestManager
    {
        Task<Request> CreateRequest(Request request);
        Task<Request> UpdateRequest(Request request);

        Task<Request> SubmitRequest(Request request);
        Task<bool> ChangeRequestStatus(int RequestId,int Status, int UserId);

        Task<Request> GetRequestById(int requestId);
        Task<List<Request>> GetRequestByStatus(int Status);
        Task<RequestMasterData> GetRequestMasterData();
        Task<List<Request>> GetRequestsByCreatedUser(int userId);
        Task<int> uploadDocument(RequestDocument document);
        Task<List<RequestDocument>> fetchDocuments(int requestID, int documentId);
        Task<List<RequestComments>> AddComments(RequestComments comments);
        Task<List<RequestComments>> UpdateComments(RequestComments comments);

        Task<RequestMapping> MapRequest(RequestMapping mapping);

        Task<bool> UpdateMapPolicy(RequestMapping mapping);
        Task<bool> DeleteRequestDocument(int requestId, int documentId);
        Task<RequestMapping> GetMapPolicyById(int mapId);

        Task<List<RequestDocument>>  GetAllRequestDocuments(int requestId,string documentType);
    }
}
