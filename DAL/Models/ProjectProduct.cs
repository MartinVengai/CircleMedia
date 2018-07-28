using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    [Table("ProjectProducts")]
    public class ProjectProduct
    {
        public int ProjectId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public Project Project { get; set; }
    }
}
