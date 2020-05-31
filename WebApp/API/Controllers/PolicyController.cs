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
        // private IFileManager _fileManager;
        // private string policyDocumentsFolder = "PolicyDocuments/";


        public PolicyController(IPolicyManager policyManager, IFileManager fileManager)
        {
            _policyManager = policyManager;
            //_fileManager = fileManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody]Policy policy)
        {
            var p = await _policyManager.CreatePolicy(policy);

            return Ok(p);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateRequest([FromBody] Policy policy)
        {
            var p = await _policyManager.UpdatePolicy(policy);

            return Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> GetPolicyById([FromQuery] int id)
        {
            var p = await _policyManager.GetPolicyById(id);

            return Ok(p);
        }

    }


}