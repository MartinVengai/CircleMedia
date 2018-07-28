using System.Collections.Generic;

namespace DAL.Models
{
    public class Client : AuditableEntity
    {
        public int Id { get; set; }
        public string ClientCode { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int SourcedFromId { get; set; }
        public ProjectSource SourcedFrom { get; set; }
        public ICollection<Project> Projects { get; set; }

        public Client()
        {
            Projects = new List<Project>();
        }
    }
}
