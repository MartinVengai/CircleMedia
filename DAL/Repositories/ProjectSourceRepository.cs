using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ProjectSourceRepository : Repository<ProjectSource>, IProjectSourceRepository
    {
        public ProjectSourceRepository(DbContext context) : base(context)
        {
        }
    }
}
