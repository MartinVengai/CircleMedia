namespace CircleMedia.Resources
{
    public class ProjectQueryResource
    {
        public string UserId { get; set; }
        public int? StatusId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
        public int Page { get; set; }
        public byte PageSize { get; set; }
        public string SearchTerm { get; set; }
    }
}