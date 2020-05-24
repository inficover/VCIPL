using Microsoft.IdentityModel.Tokens;
using Model;
using Model.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Common.Helper
{
    public class TokenGenerator
    {
        public TokenEntity GenerateToken(UserWithHierarchy user, string secret)
        {
            if (string.IsNullOrEmpty(user.MailId) || string.IsNullOrEmpty(secret))
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            int tokenValidity = 2;
            var key = Encoding.ASCII.GetBytes(secret);
            //var options = new jsonserializeroptions
            //{
            //    referencehandling = referencehandling.preserve
            //};
            DefaultContractResolver contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy
                {
                    OverrideSpecifiedNames = false
                }
            };
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.MailId),
                    new Claim("user", JsonConvert.SerializeObject(user, new JsonSerializerSettings
                        {
                            ContractResolver = contractResolver,
                            Formatting = Formatting.Indented
                        }))
                }),
                Expires = DateTime.UtcNow.AddDays(tokenValidity),
                //Expires = DateTime.UtcNow.AddMilliseconds(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenKey = tokenHandler.WriteToken(token);
            TokenEntity tokenEntity = new TokenEntity
            {
                Token = tokenKey,
                ValidFrom = DateTime.UtcNow,
                ValidUntil = tokenDescriptor.Expires.GetValueOrDefault(),
                UserId = user.Id
            };

            return tokenEntity;
        }
    }
}
