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
        public async Task<IActionResult> CreatePolicy([FromBody]Policy policy)
        {
            var p = await _policyManager.CreatePolicy(policy);

            return Ok(p);
        }

        [HttpPost]
        public async Task<IActionResult> UpdatePolicy([FromBody] Policy policy)
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