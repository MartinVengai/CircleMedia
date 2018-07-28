using DAL.Core;
using DAL.Models;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IClientRepository : IRepository<Client>
    {
        Task<QueryResult<Client>> GetAllAsync(ClientQuery queryObj);
        Task<Client> GetAsync(int id, bool includeRelated = true);
    }
}
