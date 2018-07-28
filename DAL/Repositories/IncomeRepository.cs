using DAL.Core;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class IncomeRepository : Repository<Income>, IIncomeRepository
    {
        private readonly ApplicationDbContext _context;

        public IncomeRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Income> GetAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await _context.Incomes.FindAsync(id);

            return await _context.Incomes
                .Include(i => i.Category)
                .SingleOrDefaultAsync(i => i.Id == id);
        }

        public IEnumerable<GroupedIncome> GetAllGrouped()
        {
            var incomes = _context.Incomes
                .GroupBy(i => i.Category.Name)
                .Select(g => new GroupedIncome { Category = g.Key, Incomes = g.ToList() })
                .ToList();

            return incomes;
        }
    }
}
