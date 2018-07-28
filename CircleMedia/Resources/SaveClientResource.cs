using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace CircleMedia.Resources
{
    public class SaveClientResource
    {
        public int Id { get; set; }
        public string ClientCode { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int SourcedFromId { get; set; }
        public KeyValuePairResource SourcedFrom { get; set; }
        public ICollection<ProjectResource> Projects { get; set; }

        public SaveClientResource()
        {
            Projects = new Collection<ProjectResource>();
        }
    }
}