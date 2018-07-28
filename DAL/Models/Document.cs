using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Document : AuditableEntity
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string FileName { get; set; }
        public int ProjectId { get; set; }
    }
}
