using DAL.Models;
using System;

namespace CircleMedia.Resources
{
    public class SaveIncomeResource
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public int ProjectId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

    }

    public class IncomeResource
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public IncomeCategory Category { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

    }
}