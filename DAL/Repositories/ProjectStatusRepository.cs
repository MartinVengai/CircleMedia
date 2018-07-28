using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ProjectStatusRepository : Repository<ProjectStatus>, IProjectStatusRepository
    {
        public ProjectStatusRepository(DbContext context) : base(context)
        {
        }
    }
}