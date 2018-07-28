using System;

namespace CircleMedia.Resources
{
    public class DocumentResource
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public DateTime CreatedDate { get; set; }
        public ReadUserResource UserCreate { get; set; }
    }
}
