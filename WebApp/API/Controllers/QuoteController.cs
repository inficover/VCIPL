using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Contract.Manager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models.QuoteModel;
using Model.Models.ResponseModels;
using Newtonsoft.Json;

namespace VCIPL.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        IQuoteManager manager;
        public QuoteController(IQuoteManager _manager)
        {
            manager = _manager;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<PremiumDetails>> GetQuote(Quote model)
        {
            try
            {
                var responseContent = await manager.GetQuote(model);
                return Ok(responseContent);
            }
            catch (Exception ex)
            {
                if (ex!=null && ex.Message== "BadRequest")
                {
                    return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
                }
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
