namespace CircleMedia.Resources
{
    public class ClientQueryResource
    {
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
        public int Page { get; set; }
        public byte PageSize { get; set; }
        public string SearchTerm { get; set; }
    }
}