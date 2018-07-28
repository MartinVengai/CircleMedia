using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class ProjectSource
    {
        public int Id { get; set; }
        [StringLength(255)]
        [Required]
        public string Name { get; set; }
    }
}