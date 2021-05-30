using Contract.Manager;
using Contract.Repository;
using Model.Models.QuoteModel;
using Model.Models.ResponseModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Manager
{
    public class QuoteManager : IQuoteManager
    {
        IQuoteRepository repository;
        public QuoteManager(IQuoteRepository repo)
        {
            repository = repo;
        }
        public async Task<PremiumDetails> GetQuote(Quote model)
        {
            return await repository.GetQuote(model);
        }
        public async Task UpdateDetails(UpdateVehicleModel model)
        {
            await repository.UpdateDetails(model);
        }
    }
}
