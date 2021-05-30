using Contract.Repository;
using Model.Models.QuoteModel;
using System;
using System.Collections.Generic;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http.Json;
using Model.Models.ResponseModels;
using System.Text.Json;
using System.Net.Http.Headers;
using System.Net;

namespace Repository
{
    public class QuoteRepository : IQuoteRepository
    {
        public QuoteRepository()
        {
        }
        public async Task<PremiumDetails> GetQuote(Quote model)
        {
            PremiumDetails responseContent = null;

            model.authenticationDetails = new Model.Models.AuthenticationDetails() { agentId = "PO006983", apikey = "310ZQmv/bYJMYrWQ1iYa7s43084=" };
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://dtcdocstag.royalsundaram.in");
            var jsonModel = System.Text.Json.JsonSerializer.Serialize(model);
            var request = new HttpRequestMessage(HttpMethod.Post, "/Services/Product/TwoWheeler/CalculatePremium");
            request.Content = new StringContent(jsonModel, Encoding.UTF8);
            request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var StringResponse = await response.Content.ReadAsStringAsync();
                responseContent = JsonConvert.DeserializeObject<PremiumDetails>(StringResponse);
            }
            else
            {
                throw new Exception("BadRequest");
            }

            return responseContent;
        }
    }
}
