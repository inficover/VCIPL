﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Model.Models.Policy;
using OfficeOpenXml;
using Document = Model.Models.Policy.Document;

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
        public async Task<IActionResult> CreatePolicy([FromBody] Policy policy)
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

                var p = await _policyManager.CreatePolicy(policy);


                string filePath = policyDocumentsFolder + p.Id.ToString() + "/PolicyDocument";
                var result = await _fileManager.UploadFile(blobData, filePath, document.FileType);

                if (result.Contains("failed"))
                    return BadRequest(new { message = "Upload document failed" });

                p.Documents[0].DataAsBase64 = Convert.ToBase64String(blobData);

                return Ok(p);
            }
            else
            {
                var p = await _policyManager.CreatePolicy(policy);
                return Ok(p);
            }
        }


        [HttpPost]
        public async Task<IActionResult> AddVehicle([FromBody] AddVehicleModel model)
        {
            var vehicle = await _policyManager.AddVehicle(model);

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
            }
            else
            {
                var p = await _policyManager.UpdatePolicy(policy);
                return Ok(p);
            }

        }
        [HttpPost]
        public async Task<IActionResult> BulkUploadVehicles(IFormFile formFile)
        {
            var file = Request.Form.Files[0];
            List<string> list = new List<string>();
            try
            {
                //byte[] data = System.Convert.FromBase64String(doc.DataAsBase64);
                using (var stream = new MemoryStream())
                {
                    //await stream.ReadAsync(data);
                    await file.CopyToAsync(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[1];
                        var rowCount = worksheet.Dimension.Rows;

                        for (int row = 2; row <= rowCount; row++)
                        {
                            list.Add(worksheet.Cells[row, 1].Value.ToString().Trim());
                        }
                    }
                }
            } catch(Exception e)
            {
                string s = e.Message;
            }
            
            return Ok(list);
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

        [HttpPost]
        public async Task<IActionResult> GetVehiclesByCriteria([FromBody] VehicleSearchCriteria criteria)
        {
            var p = await _policyManager.GetVehiclesByCriteria(criteria);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> CheckPolicyNumber([FromQuery] int PolicyId, [FromQuery] string PolicyNumber)
        {
            var p = await _policyManager.CheckPolicyNumber(PolicyId, PolicyNumber);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> GetMasterDataByDataType([FromQuery] string DataType, [FromQuery] int ParentId)
        {
            var p = await _policyManager.GetMasterDataByDataType(DataType, ParentId);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> DeleteVehicle([FromQuery] int VarientId)
        {
            var p = await _policyManager.DeleteVehicle(VarientId);

            return Ok(p);
        }

    }
}