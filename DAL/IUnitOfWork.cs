using DAL.Repositories.Interfaces;
using System.Threading.Tasks;

namespace DAL
{
    public interface IUnitOfWork
    {
        IDocumentRepository Documents { get; }
        IProjectRepository Projects { get; }
        INotificationRepository Notifications { get; }
        IClientRepository Clients { get; }
        IProjectStatusRepository ProjectStatus { get; }
        IProjectSourceRepository ProjectSource { get; }
        IProductRepository Products { get; }
        IIncomeRepository Income { get; }
        IIncomeCategoryRepository IncomeCategory { get; }
        IExpenseCategoryRepository ExpenseCategory { get; }
        int SaveChanges();
        Task<int> CompleteAsync();
    }
}
