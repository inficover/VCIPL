using Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace VCIPL.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PolicyRenewalNotificationsController : Controller
    {
        private IPolicyRenewalNotificationsManager _manager;


        public PolicyRenewalNotificationsController(IPolicyRenewalNotificationsManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<IActionResult> RefreshNotifications([FromQuery] int userId)
        {
            var results = await _manager.RefreshNotifications(userId);
            return Ok(results);
        }


    }
}