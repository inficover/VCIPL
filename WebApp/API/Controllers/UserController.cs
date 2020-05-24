using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;
using Model.Models;

namespace VCIPL.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserManager _userManager;
        private IFileManager _fileManager;
        private string userDocumentsFolder = "UserDocuments/";

        public UserController(IUserManager userManager, IFileManager fileManager)
        {
            _userManager = userManager;
            _fileManager = fileManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]User userLogin)
        {
            var user = await _userManager.GetUser(userLogin.UserName, userLogin.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]User user)
        {
            var userEntity = await _userManager.CreateUser(user);

            if (userEntity == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            string message;
            if (userEntity is UserWithError)
            {
                message = (userEntity as UserWithError).ErrorMessage;
                return BadRequest(new { message = message });
            }

            return Ok(userEntity);
        }

        [HttpGet]
        public IActionResult IsValid()
        {
            return Ok("Token is Valid");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersCreatedBy([FromQuery]int userId)
        {
            var results = await _userManager.GetAllUsersCreatedBy(userId);
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> GetUsersByIds([FromBody]List<int> userIds)
        {
            var results = await _userManager.GetUsersByIds(userIds);
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllKycPendingUsers()
        {
            var results = await _userManager.GetAllKycPendingUsers();
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserDetailsById([FromQuery]int userId)
        {
            var results = await _userManager.GetUserDetailsById(userId);
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordModel model)
        {
            var results = await this._userManager.ChangePassword(model);
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> ChangeUserActivation([FromQuery]int UserId, [FromQuery]bool IsActive)
        {
            var results = await this._userManager.ChangeUserActivation(UserId, IsActive);
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> ChangeUserStatus([FromQuery]int UserId, [FromQuery]int Status)
        {
            var results = await this._userManager.ChangeUserStatus(UserId, Status);
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> ChangeUserManager([FromQuery]int UserId, [FromQuery]int ManagerId)
        {
            var results = await this._userManager.ChangeUserManager(UserId, ManagerId);
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> GetMasterData()
        {
            var results = await _userManager.GetMasterData();
            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOtherManagers([FromQuery]int userId)
        {
            var results = await _userManager.GetAllOtherManagers(userId);
            return Ok(results);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateUser([FromBody]User user)
        {
            var userEntity = await _userManager.UpdateUser(user);

            if (userEntity == null)
                return BadRequest(new { message = "No User exists with the provided details to perform an update" });

            return Ok(userEntity);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserDocuments([FromQuery]int userId, [FromQuery]string documentName)
        {
            var userEntity = await _userManager.fetchKYCDocuments(userId, documentName);
            string filePath = userDocumentsFolder + userId.ToString() + "/" + documentName;
            var result = await _fileManager.RetreiveFile(filePath, userEntity[0].FileType);
            userEntity[0].Data = result;

            userEntity[0].DataAsBase64 = Convert.ToBase64String(userEntity[0].Data);
            if (userEntity.Count == 0  || result == null)
                return BadRequest(new { message = "No associated documents for user" });

            return Ok(userEntity);
        }

        [HttpPost]
        public async Task<IActionResult> UploadKYCDocument([FromForm]Document document)
        {
            if (document.DataAsBase64.Contains(","))
            {
                document.DataAsBase64 = document.DataAsBase64
                  .Substring(document.DataAsBase64
                  .IndexOf(",") + 1);
            }

            document.Data = Convert.FromBase64String(document.DataAsBase64);
            string filePath = userDocumentsFolder + document.UserId.ToString() + "/" + document.Name;
            var result = await _fileManager.UploadFile(document.Data, filePath , document.FileType);
            document.Data = null;
            var userEntity = await _userManager.uploadDocument(document);

            if (!userEntity || result.Contains("failed"))
                return BadRequest(new { message = "Upload failed" });

            return Ok(userEntity && !result.Contains("failed"));
        }
    }
}