using DAL.Core;
using DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task<QueryResult<Project>> GetAllAsync(ProjectQuery queryObj);
        Task<Project> GetAsync(int id, bool includeRelated = true);
        Task<List<ProjectCount>> GetStatistics(string userId);
    }
}