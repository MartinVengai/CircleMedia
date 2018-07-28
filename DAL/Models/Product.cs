using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Product : AuditableEntity
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        public int Turnover { get; set; }

        [Required]
        public decimal Price { get; set; }
    }
}
