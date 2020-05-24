using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Models;

namespace VCIPL.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RequestController : Controller
    {
        private IRequestManager _requestManager;
        private IFileManager _fileManager;
        private string requestDocumentsFolder = "RequestDocuments/";


        public RequestController(IRequestManager requestManager, IFileManager fileManager)
        {
            _requestManager = requestManager;
            _fileManager = fileManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody]Request request)
        {
            var req = await _requestManager.CreateRequest(request);

            return Ok(req);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateRequest([FromBody]Request request)
        {
            var req = await _requestManager.UpdateRequest(request);

            return Ok(req);
        }

        [HttpPost]
        public async Task<IActionResult> SubmitRequest([FromBody]Request request)
        {
            var req = await _requestManager.SubmitRequest(request);

            return Ok(req);
        }

        [HttpGet]
        public async Task<IActionResult> ChangeRequestStatus([FromQuery]int requestId, [FromQuery]int Status, [FromQuery]int UserId)
        {
            var req = await _requestManager.ChangeRequestStatus(requestId, Status, UserId);

            return Ok(req);
        }
       
        [HttpGet]
        public async Task<IActionResult> GetRequestById([FromQuery]int requestId)
        {
            var req = await _requestManager.GetRequestById(requestId);

            return Ok(req);
        }

        public async Task<IActionResult> GetRequestByStatus([FromQuery]int Status)
        {
            var req = await _requestManager.GetRequestByStatus(Status);

            return Ok(req);
        }

        [HttpGet]
        public async Task<IActionResult> GetRequestsByCreatedUser([FromQuery]int userId)
        {
            var req = await _requestManager.GetRequestsByCreatedUser(userId);

            return Ok(req);
        }

        [HttpGet]
        public async Task<IActionResult> GetRequestMasterData()
        {
            var results = await _requestManager.GetRequestMasterData();
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> GetRequestDocuments([FromQuery]int requestId, [FromQuery]int documentId)
        {
            var reqEntity = await _requestManager.fetchDocuments(requestId, documentId);

            string filePath = requestDocumentsFolder + requestId.ToString() + "/" + documentId;
            var result = await _fileManager.RetreiveFile(filePath, reqEntity[0].FileType);
            reqEntity[0].Data = result;

            reqEntity[0].DataAsBase64 = Convert.ToBase64String(reqEntity[0].Data);
            if (reqEntity.Count == 0)
                return BadRequest(new { message = "No associated documents for user" });

            return Ok(reqEntity);
        }

        // TOdo :: this not implemented yet
        [HttpGet]
        public async Task<IActionResult> GetAllRequestDocuments([FromQuery]int requestId, [FromQuery]string documentType)
        {
            var reqDocs = await _requestManager.GetAllRequestDocuments(requestId, documentType);

            return Ok(reqDocs);
        }

        [HttpGet]
        public async Task<IActionResult> DeleteRequestDocument([FromQuery]int requestId, [FromQuery]int documentId)
        {
            string filePath = requestDocumentsFolder + requestId.ToString() + "/" + documentId;

            var result = await _fileManager.DeleteFile(filePath);

            var response = await _requestManager.DeleteRequestDocument(requestId, documentId);

            if (!response|| result.Contains("failed"))
                return BadRequest(new { message = "Delete failed" });

            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> UploadDocument([FromForm]RequestDocument document)
        {
            if (document.DataAsBase64.Contains(","))
            {
                document.DataAsBase64 = document.DataAsBase64
                  .Substring(document.DataAsBase64
                  .IndexOf(",") + 1);
            }

            var blobData = Convert.FromBase64String(document.DataAsBase64);
            document.Data = null;

            var response = await _requestManager.uploadDocument(document);

            string filePath = requestDocumentsFolder + document.RequestId.ToString() + "/" + response;
            var result = await _fileManager.UploadFile(blobData, filePath, document.FileType);


            if (response==0 || result.Contains("failed"))
                return BadRequest(new { message = "Upload failed" });

            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> AddComments([FromBody] RequestComments comment)
        {
            var req = await _requestManager.AddComments(comment);

            return Ok(req);
        }
        [HttpPost]
        public async Task<IActionResult> UpdateComments([FromBody] RequestComments comment)
        {
            var req = await _requestManager.UpdateComments(comment);

            return Ok(req);
        }

        [HttpPost]
        public async Task<IActionResult> MapPolicy([FromBody]RequestMapping mapping)
        {
            var req = await _requestManager.MapRequest(mapping);

            return Ok(req);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateMapPolicy([FromBody]RequestMapping mapping)
        {
            var req = await _requestManager.UpdateMapPolicy(mapping);

            return Ok(req);
        }

        [HttpGet]
        public async Task<IActionResult> GetMapPolicyById([FromQuery]int requestMapId)
        {
            var req = await _requestManager.GetMapPolicyById(requestMapId);

            return Ok(req);
        }
    }


}