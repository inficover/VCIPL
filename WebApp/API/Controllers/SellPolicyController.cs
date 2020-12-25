using System;
using System.Threading.Tasks;
using Contract;
using Microsoft.AspNetCore.Authorization;
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
            dynamic resp = null;
            try
            {
                resp = await _sellPolicyManager.CreatePolicyLink(details);
                
            } catch(Exception e)
            {
                return Ok(new { error = e.Message });
            }
            return Ok(resp);
        }

        [HttpGet]
        public async Task<IActionResult> GetMasterDataByParentId([FromQuery] string masterDataType, [FromQuery] int parentId)
        {
            var d = await _sellPolicyManager.GetMasterDataByParentId(masterDataType, parentId);

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

        [HttpGet]
        public async Task<IActionResult> DeleteLink([FromQuery] int id)
        {
            var d = await _sellPolicyManager.DeleteLink(id);

            return Ok(d);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateLink([FromBody] SellPolicyUpdateUrl data)
        {
            var d = await _sellPolicyManager.UpdateLink(data.Id, data.NewUrl);

            return Ok(d);
        }
    }
}
