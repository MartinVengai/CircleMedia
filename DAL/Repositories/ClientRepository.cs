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
    public class ClientRepository : Repository<Client>, IClientRepository
    {
        private readonly ApplicationDbContext _context;

        public ClientRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<QueryResult<Client>> GetAllAsync(ClientQuery queryObj)
        {
            var result = new QueryResult<Client>();

            var query = _context.Clients
                .Include(client => client.SourcedFrom)
                .Include(client => client.Projects).ThenInclude(p => p.AssignedUser)
                .Include(client => client.Projects).ThenInclude(p => p.Status)
                .Include(client => client.Projects).ThenInclude(p => p.Product)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObj.SearchTerm))
                query = query.Where(client => client.Name.Contains(queryObj.SearchTerm) ||
                                         client.Email.Contains(queryObj.SearchTerm) ||
                                         client.ClientCode.Contains(queryObj.SearchTerm) ||
                                         client.PhoneNumber.Contains(queryObj.SearchTerm));

            var columnsMap = new Dictionary<string, Expression<Func<Client, object>>>
            {
                ["email"] = p => p.Email,
                ["name"] = p => p.Name,
                ["sourcedFrom"] = p => p.SourcedFrom.Name,
                ["clientCode"] = p => p.ClientCode
            };

            query = query.ApplyOrdering(queryObj, columnsMap);
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);
            result.Items = await query.ToListAsync();

            return result;

        }

        public async Task<Client> GetAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await _context.Clients.FindAsync(id);

            return await _context.Clients
                .Include(p => p.SourcedFrom)
                .Include(p => p.Projects).ThenInclude(p => p.AssignedUser)
                .Include(p => p.Projects).ThenInclude(p => p.Status)
                .Include(p => p.Projects).ThenInclude(p => p.Product)
                .SingleOrDefaultAsync(p => p.Id == id);
        }
    }
}
