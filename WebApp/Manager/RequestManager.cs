using Contract;
using Contract.Repository;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Manager
{
    public class RequestManager : IRequestManager
    {
        IRequestRepository _requestRepository;
        IRequestDocumentRepository _requestDocumentRepository;
        public RequestManager(IRequestRepository requestRepository, IRequestDocumentRepository requestDocumentRepository)
        {
            _requestRepository = requestRepository;
            _requestDocumentRepository = requestDocumentRepository;
        }

        public async Task<Request> CreateRequest(Request request)
        {
            return await _requestRepository.CreateRequest(request);
        }

        public async Task<List<RequestDocument>> GetAllRequestDocuments(int requestId, string documentType)
        {
            return await _requestDocumentRepository.GetAllRequestDocuments(requestId, documentType);
        }

        public async Task<bool> DeleteRequestDocument(int requestId, int documentId)
        {
            return await _requestDocumentRepository.DeleteRequestDocument(requestId, documentId);
        }

        public async Task<Request> UpdateRequest(Request request)
        {
            return await _requestRepository.UpdateRequest(request);
        }
        public async Task<Request> SubmitRequest(Request request)
        {
            return await _requestRepository.SubmitRequest(request);
        }
        public async Task<bool> ChangeRequestStatus(int RequestId,int Status, int UserId)
        {
            return await _requestRepository.ChangeRequestStatus(RequestId, Status, UserId);
        }
     
        public async Task<Request> GetRequestById(int requestId)
        {
            return await _requestRepository.GetRequestById(requestId);
        }

        public async Task<List<Request>> GetRequestByStatus(int Status)
        {
            return await _requestRepository.GetRequestByStatus(Status);
        }

        public async Task<List<Request>> GetRequestsByCreatedUser(int userId)
        {
            return await _requestRepository.GetRequestsByCreatedUser(userId);
        }

        public async Task<RequestMasterData> GetRequestMasterData()
        {
            var requestMasterData = await _requestRepository.GetRequestMasterData();
            return requestMasterData;
        }

     
        public async Task<int> uploadDocument(RequestDocument document)
        {
            var result = await _requestDocumentRepository.AddDocuments(document);
            return result;
        }

        public async Task<List<RequestDocument>> fetchDocuments(int requestID, int documentId)
        {
            var result = await _requestDocumentRepository.GetDocumentsByRequestId(requestID, documentId);
            return result;
        }
        

        public async Task<List<RequestComments>> AddComments(RequestComments comments)
        {
            var result = await _requestRepository.AddComments(comments);
            return result;
        }

        public async Task<List<RequestComments>> UpdateComments(RequestComments comments)
        {
            var result = await _requestRepository.UpdateComments(comments);
            return result;
        }


        public async Task<RequestMapping> MapRequest(RequestMapping mapping)
        {
            var result = await _requestRepository.MapRequest(mapping);
            return result;
        }

        public async Task<bool> UpdateMapPolicy(RequestMapping mapping)
        {
            var result = await _requestRepository.UpdateMapPolicy(mapping);
            return result;
        }
        public async Task<RequestMapping> GetMapPolicyById(int requestId)
        {
            return await _requestRepository.GetMapPolicyById(requestId);
        }

    }
}
