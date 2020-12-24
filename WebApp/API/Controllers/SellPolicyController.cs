using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models.SellPolicy;

namespace VCIPL.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SellPolicyController : Controller
    {
        ISellPolicyManager _sellPolicyManager;

        public SellPolicyController(ISellPolicyManager SellPolicyManager)
        {
            _sellPolicyManager = SellPolicyManager;
        }
        [HttpPost]
        public async Task<IActionResult> CreatePolicyLink([FromBody] SellPolicyLinkDetails details)
        {
            var d = await _sellPolicyManager.CreatePolicyLink(details);

            return Ok(d);
        }

        [HttpGet]
        public async Task<IActionResult> GetSellPolicyMaserData()
        {
            var d = await _sellPolicyManager.GetSellPolicyMaserData();

            return Ok(d);
        }

        [HttpPost]
        public async Task<IActionResult> AddMasterData([FromBody] SellPolicyAddMasterData data)
        {
            var d = await _sellPolicyManager.AddMasterData(data);

            return Ok(d);
        }

        [HttpPost]
        public async Task<IActionResult> GetPolicyLinkByDetails([FromBody] SellPolicyLinkDetails data)
        {
            var d = await _sellPolicyManager.GetPolicyLinkByDetails(data);

            return Ok(d);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteMasterData([FromBody] SellPolicyDeleteMasterData data)
        {
            var d = await _sellPolicyManager.DeleteMasterData(data);

            return Ok(d);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateMasterData([FromBody] SellPolicyUpdateMasterData data)
        {
            var d = await _sellPolicyManager.UpdateMasterData(data);

            return Ok(d);
        }
    }
}
