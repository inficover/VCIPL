using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Model.Models.QuoteModel;
using Model.Models.ResponseModels;

namespace Contract.Repository
{
    public interface IQuoteRepository
    {
        Task<PremiumDetails> GetQuote(Quote model);
        Task UpdateDetails(UpdateVehicleModel model);
    }
}
