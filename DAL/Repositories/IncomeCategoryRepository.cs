using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class IncomeCategoryRepository : Repository<IncomeCategory>, IIncomeCategoryRepository
    {
        public IncomeCategoryRepository(DbContext context) : base(context)
        {
        }
    }
}
