using Model.Models.QuoteModel;
using Model.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Manager
{
    public interface IQuoteManager
    {
        Task<PremiumDetails> GetQuote(Quote model);
        Task UpdateDetails(UpdateVehicleModel model);
    }
}
