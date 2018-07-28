using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Income : AuditableEntity
    {
        public int Id { get; set; }
        [StringLength(255)]
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public IncomeCategory Category { get; set; }
        [StringLength(300)]
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
