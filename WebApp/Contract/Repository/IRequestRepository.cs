using Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository
{
    public interface IRequestRepository
    {
        Task<Request> CreateRequest(Request request);
        Task<Request> UpdateRequest(Request request);
        Task<Request> SubmitRequest(Request request);
        Task<bool> ChangeRequestStatus(int RequestId, int Status, int UserId);
        Task<Request> GetRequestById(int requestId);

        Task<List<Request>> GetRequestByStatus(int Status);
        Task<RequestMasterData> GetRequestMasterData();
        Task<List<Request>> GetRequestsByCreatedUser(int userId);

        Task<List<RequestComments>> AddComments(RequestComments comments);
        Task<List<RequestComments>> UpdateComments(RequestComments comments);
        Task<RequestMapping> MapRequest(RequestMapping mapping);

        Task<bool> UpdateMapPolicy(RequestMapping mapping);
        Task<RequestMapping> GetMapPolicyById(int mapId);
    }
}
