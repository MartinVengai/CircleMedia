using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class IncomeCategory
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
    }
}
