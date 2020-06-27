using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Model.Models.Policy;

namespace VCIPL.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PolicyController : Controller
    {
        private IPolicyManager _policyManager;

         private IFileManager _fileManager;
         private string policyDocumentsFolder = "PolicyDocuments/";


        public PolicyController(IPolicyManager policyManager, IFileManager fileManager)
        {
            _policyManager = policyManager;
            _fileManager = fileManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePolicy([FromBody]Policy policy)
        {
            if(policy.Documents != null && policy.Documents.Count > 0)
            {
                var document = policy.Documents[0];
                if (document.DataAsBase64.Contains(","))
                {
                    document.DataAsBase64 = document.DataAsBase64
                      .Substring(document.DataAsBase64
                      .IndexOf(",") + 1);
                }

                var blobData = Convert.FromBase64String(document.DataAsBase64);
                document.Data = null;

                var p = await _policyManager.CreatePolicy(policy);


                string filePath = policyDocumentsFolder + p.Id.ToString() + "/PolicyDocument";
                var result = await _fileManager.UploadFile(blobData, filePath, document.FileType);

                if (result.Contains("failed"))
                    return BadRequest(new { message = "Upload document failed" });

                p.Documents[0].DataAsBase64 = Convert.ToBase64String(blobData);

                return Ok(p);
            } else
            {
                var p = await _policyManager.CreatePolicy(policy);
                return Ok(p);
            }
        }


        [HttpPost]
        public async Task<IActionResult> AddVehicle([FromBody] AddVehicleModel model)
        {
            var vehicle = await _policyManager.AddVehicle(model);

            //if (userEntity == null)
            //    return BadRequest(new { message = "Username or password is incorrect" });
            //string message;
            //if (userEntity is UserWithError)
            //{
            //    message = (userEntity as UserWithError).ErrorMessage;
            //    return BadRequest(new { message = message });
            //}

            return Ok(vehicle);
        }

        [HttpPost]
        public async Task<IActionResult> UpdatePolicy([FromBody] Policy policy)
        {
            if (policy.Documents != null && policy.Documents.Count > 0)
            {
                var document = policy.Documents[0];
                if (document.DataAsBase64.Contains(","))
                {
                    document.DataAsBase64 = document.DataAsBase64
                      .Substring(document.DataAsBase64
                      .IndexOf(",") + 1);
                }

                var blobData = Convert.FromBase64String(document.DataAsBase64);
                document.Data = null;

                var p = await _policyManager.UpdatePolicy(policy);

                string filePath = policyDocumentsFolder + p.Id.ToString() + "/PolicyDocument";
                var result = await _fileManager.UploadFile(blobData, filePath, document.FileType);

                if (result.Contains("failed"))
                    return BadRequest(new { message = "Upload document failed" });

                p.Documents[0].DataAsBase64 = Convert.ToBase64String(blobData);

                return Ok(p);
            } else
            {
                var p = await _policyManager.UpdatePolicy(policy);
                return Ok(p);
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetPolicyById([FromQuery] int id)
        {
            var p = await _policyManager.GetPolicyById(id);
            if (p.Documents != null && p.Documents.Count > 0)
            {
                var document = p.Documents[0];


                string filePath = policyDocumentsFolder + p.Id.ToString() + "/PolicyDocument";

                var result = await _fileManager.RetreiveFile(filePath, document.FileType);
                document.Data = result;

                document.DataAsBase64 = Convert.ToBase64String(document.Data);
            }

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> GetPolicyMasterData()
        {
            var p = await _policyManager.GetPolicyMasterData();

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> GetPoliciesByCreatedUserId([FromQuery] int userId)
        {
            var p = await _policyManager.GetPoliciesByCreatedUserId(userId);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> ChangePolicyStatus([FromQuery] int id, [FromQuery] int status, [FromQuery] int userId)
        {
            var p = await _policyManager.ChangePolicyStatus(id, status, userId);

            return Ok(p);
        }

        [HttpPost]
        public async Task<IActionResult> GetPoliciesByCriteria([FromBody] PolicySearchCriteria criteria)
        {
            var p = await _policyManager.GetPoliciesByCriteria(criteria);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> CheckPolicyNumber([FromQuery] int PolicyId, [FromQuery] string PolicyNumber)
        {
            var p = await _policyManager.CheckPolicyNumber(PolicyId, PolicyNumber);

            return Ok(p);
        }

    }


}