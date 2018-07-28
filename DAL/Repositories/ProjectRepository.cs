using DAL.Core;
using DAL.Extensions;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<QueryResult<Project>> GetAllAsync(ProjectQuery queryObj)
        {
            var result = new QueryResult<Project>();

            var query = _context.Projects
                .Include(p => p.Status)
                .Include(p => p.Product)
                .Include(p => p.AssignedUser)
                .Include(p => p.Client)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObj.UserId))
                query = query.Where(p => p.AssignedUserId == queryObj.UserId);

            if (queryObj.StatusId.HasValue)
                query = query.Where(p => p.StatusId == queryObj.StatusId.Value);

            if (!string.IsNullOrWhiteSpace(queryObj.SearchTerm))
            {
                query = queryObj.SearchTerm == "!Completed"
                    ? query.Where(p => !p.Status.Name.Contains("Completed"))
                    : query.Where(p =>
                        p.Client.Name.Contains(queryObj.SearchTerm) ||
                        p.Client.Email.Contains(queryObj.SearchTerm) ||
                        p.Product.Name.Contains(queryObj.SearchTerm) ||
                        p.Status.Name.Contains(queryObj.SearchTerm) ||
                        p.AssignedUser.FullName.Contains(queryObj.SearchTerm));
            }

            var columnsMap = new Dictionary<string, Expression<Func<Project, object>>>
            {
                ["dateReceived"] = p => p.DateReceived,
                ["dueDate"] = p => p.DueDate,
                ["client"] = p => p.Client.Name,
                ["product"] = p => p.Product.Name,
                ["status"] = p => p.Status.Name,
                ["assigned"] = p => p.AssignedUser.FullName,
                ["priority"] = p => p.GetDaysRemaining            };

            query = query.ApplyOrdering(queryObj, columnsMap);
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);
            result.Items = await query.ToListAsync();

            return result;
        }

        public async Task<Project> GetAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await _context.Projects.FindAsync(id);

            return await _context.Projects
                .Include(p => p.Status)
                .Include(p => p.AssignedUser)
                .Include(p => p.Product)
                .Include(p => p.Client)
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<ProjectCount>> GetStatistics(string userId)
        {
            IQueryable<ProjectCount> result = from status in _context.ProjectStatuses
                join project in _context.Projects on status.Id equals project.StatusId into projectsInStatus
                select new ProjectCount
                {
                    StatusName = status.Name,
                    Count = projectsInStatus.Count()
                };

            return await result.ToListAsync();
        }
    }
}