using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contract.Manager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace VCIPL.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MasterDataController : ControllerBase
    {
        IMasterDataManager manager;
        public MasterDataController(IMasterDataManager _manager)
        {
            manager = _manager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetQuoteMasterData([FromQuery] int insurerId)
        {
            try
            {
                var data = await manager.GetQuoteMasterData(insurerId);
                return Ok(data);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            

            
        }
    }
}
