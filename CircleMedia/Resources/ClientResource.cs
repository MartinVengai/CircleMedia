using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace CircleMedia.Resources
{
    public class ClientResource
    {
        public int Id { get; set; }
        public string ClientCode { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public KeyValuePairResource SourcedFrom { get; set; }
        public ICollection<ProjectResource> Projects { get; set; }

        public int ProjectsCount { get; internal set; }
        public int ProjectsCompleted { get; internal set; }
        public int ProjectsCompletedPercent => ProjectsCount == 0 ? 0 : ProjectsCompleted / ProjectsCount * 100;

        public ClientResource()
        {
            Projects = new Collection<ProjectResource>();
        }
    }
}
