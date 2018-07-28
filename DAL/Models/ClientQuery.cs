using DAL.Extensions;

namespace DAL.Models
{
    public class ClientQuery : IQueryObject
    {
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
        public int Page { get; set; }
        public byte PageSize { get; set; }
        public string SearchTerm { get; set; }
    }
}