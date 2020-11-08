using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Contract;
using Manager;
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
        //public async Task<HttpRequestMessage> BulkUploadVehicles(IFormFile formFile)
        public Object BulkUploadVehicles(IFormFile formFile)
        {
            var file = Request.Form.Files[0];
            dynamic resp = new ExpandoObject();
            // resp.data = Convert.ToBase64String(bin);
            resp.data = this._policyManager.BulkUploadVehicles(file);
            if (resp.data == null)
            {
                resp.errorMessage = "Something went wrong. Please check the uploaded file once.";
            }
            return resp;


            byte[] bin = new byte[] { };
            HttpResponseMessage result = new HttpResponseMessage(System.Net.HttpStatusCode.OK); ;
            List<string> list = new List<string>();
            try
            {
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[1];
                        worksheet.Cells["C2"].Style.Font.Color.SetColor(System.Drawing.Color.Green);
                        worksheet.Cells["C2"].Value = "Added on serverside!";
                        bin = package.GetAsByteArray();
                        var rowCount = worksheet.Dimension.Rows;

                        for (int row = 2; row <= rowCount; row++)
                        {
                            list.Add(worksheet.Cells[row, 1].Value.ToString().Trim());
                        }

                    }
                }
                result.Content = new ByteArrayContent(bin);
            }
            catch (Exception e)
            {
                string s = e.Message;
            }
        }

        [HttpPost]
        //public async Task<HttpRequestMessage> BulkUploadVehicles(IFormFile formFile)
        public Object BulkMasterDataUpload(IFormFile formFile, [FromQuery] string dataType)
        {
            var file = Request.Form.Files[0];
            dynamic resp = new ExpandoObject();
            // resp.data = Convert.ToBase64String(bin);
            resp.data = this._policyManager.BulkMasterDataUpload(file, dataType);
            if (resp.data == null)
            {
                resp.errorMessage = "Something went wrong. Please check the uploaded file once.";
            }
            return resp;
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
        [AllowAnonymous]
        public async Task<IActionResult> PolicyDocument([FromQuery] int id)
        {
            var p = await _policyManager.GetPolicyById(id);
            var document = p.Documents[0];
            string filePath = policyDocumentsFolder + p.Id.ToString() + "/PolicyDocument";

            var result = await _fileManager.RetreiveFile(filePath, document.FileType);

            return File(result, FileMimeTypeHelper.GetMimeType(document.FileType), document.Name + '.' + document.FileType);
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
        public async Task<IActionResult> ExportPoliciesByCriteria([FromBody] PolicySearchCriteria criteria)
        {
            await Task.Yield();
            var list = await _policyManager.GetPoliciesByCriteria(criteria);
            var stream = new MemoryStream();

            MemberInfo[] membersToInclude = typeof(PolicyDetails)
               .GetProperties(BindingFlags.Instance | BindingFlags.Public)
               .Where(p => !Attribute.IsDefined(p, typeof(EpplusIgnore)))
               // .OrderBy(p => Attribute.IsDefined(p, typeof(DataMemberAttribute))
               .ToArray();

            //var orderedProperties = (from property in typeof(MyClass).GetProperties()
            //                         where Attribute.IsDefined(property, typeof(DataMemberAttribute))
            //                         orderby ((DataMemberAttribute)property
            //                                  .GetCustomAttributes(typeof(DataMemberAttribute), false)
            //                                  .Single()).Order
            //                         select property);

            using (var package = new ExcelPackage(stream))
            {
                var workSheet = package.Workbook.Worksheets.Add("Policies");
                workSheet.Cells.LoadFromCollection(list, true, OfficeOpenXml.Table.TableStyles.Medium1,BindingFlags.Default, membersToInclude);
                package.Save();
            }
            stream.Position = 0;
            string excelName = $"Policy-List-{DateTime.Now.ToString("yyyyMMddHHmmssfff")}.xlsx";

            //return File(stream, "application/octet-stream", excelName);  
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
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
        public async Task<IActionResult> GetMasterDataByDataType([FromQuery] string DataType, [FromQuery] int ParentId, [FromQuery] string filterText)
        {
            var p = await _policyManager.GetMasterDataByDataType(DataType, ParentId, filterText);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> DeleteVehicle([FromQuery] int VarientId)
        {
            var p = await _policyManager.DeleteVehicle(VarientId);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> AddMasterData([FromQuery] string name, [FromQuery] string type)
        {
            var p = await _policyManager.AddMasterData(name, type);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> UpdateMasterData([FromQuery] string name, [FromQuery] string type, [FromQuery] int id)
        {
            var p = await _policyManager.UpdateMasterData(name, type, id);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> DeleteMasterData([FromQuery] string type, [FromQuery] int typeId)
        {
            var p = await _policyManager.DeleteMasterData(type, typeId);

            return Ok(p);
        }

        [HttpPost]
        public async Task<IActionResult> FixPayout([FromBody] PolicyPayoutDetails details)
        {
            var p = await _policyManager.FixPayout(details);

            return Ok(p);
        }

    }
}