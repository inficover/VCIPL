using Contract.Repository;
using Common.Helper;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Model.Models.Policy;

namespace Repository
{
    public class PolicyRepository : BaseRepository, IPolicyRepository
    {
        public PolicyRepository(IOptions<DbSettings> dbSettings) : base(dbSettings)
        {
        }
        public async Task<Policy> CreatePolicy(Policy Policy)
        {
            return null;
        }

        public async Task<Policy> UpdatePolicy(Policy Policy)
        {
            return null;
        }

        public async Task<Policy> GetPolicyById(int id)
        {
            return null;
        }

    }
}
