using System.Collections.Generic;

namespace DAL.Core
{
  public class QueryResult<T>
  {
    public int TotalItems { get; set; }
    public IEnumerable<T> Items { get; set; }
  }
}