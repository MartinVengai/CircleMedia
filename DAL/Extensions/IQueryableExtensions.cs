using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DAL.Extensions
{
  // ReSharper disable once InconsistentNaming
  public static class IQueryableExtensions
  {
    public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj, IReadOnlyDictionary<string, Expression<Func<T, object>>> columnsMap)
    {
      if (string.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
        return query;

      return queryObj.IsSortAscending ? query.OrderBy(columnsMap[queryObj.SortBy]) : query.OrderByDescending(columnsMap[queryObj.SortBy]);
    }

    public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQueryObject queryObj)
    {
      if (queryObj.PageSize <= 0)
        queryObj.PageSize = 10;
      if (queryObj.Page <= 0)
        queryObj.Page = 1;
      return query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize);

    }
  }
}