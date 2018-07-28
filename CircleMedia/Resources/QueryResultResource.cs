using System.Collections.Generic;

namespace CircleMedia.Resources
{
  public class QueryResultResource<T>
  {
    public int TotalItems { get; set; }
    public IEnumerable<T> Items { get; set; }
  }
}