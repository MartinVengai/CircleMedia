using System.ComponentModel.DataAnnotations;

namespace CircleMedia.Resources
{
    public class ProductResource
    {
        public int Id { get; set; }
        [Required]
        public int Turnover { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
