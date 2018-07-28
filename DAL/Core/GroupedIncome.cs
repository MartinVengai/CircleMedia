using DAL.Models;
using System.Collections.Generic;

namespace DAL.Core
{
    public class GroupedIncome
    {
        public string Category { get; set; }
        public IEnumerable<Income> Incomes { get; set; }
    }
}
