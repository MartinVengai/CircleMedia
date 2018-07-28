using DAL.Core;
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IIncomeRepository : IRepository<Income>
    {
        IEnumerable<GroupedIncome> GetAllGrouped();
    }
}