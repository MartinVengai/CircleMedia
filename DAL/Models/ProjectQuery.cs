using DAL.Extensions;

namespace DAL.Models
{
    public class ProjectQuery : IQueryObject
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
