using DAL.Repositories;
using DAL.Repositories.Interfaces;
using System.Threading.Tasks;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        public IProductRepository Products { get; }
        public IProjectStatusRepository ProjectStatus { get; }
        public IProjectSourceRepository ProjectSource { get; }
        public IProjectRepository Projects { get; }
        public IDocumentRepository Documents { get; }
        public IClientRepository Clients { get; }
        public IIncomeCategoryRepository IncomeCategory { get; }
        public IExpenseCategoryRepository ExpenseCategory { get; }
        public IIncomeRepository Income { get; }
        public INotificationRepository Notifications { get; }


        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Notifications = new NotificationRepository(_context);
            Income = new IncomeRepository(_context);
            IncomeCategory = new IncomeCategoryRepository(_context);
            ExpenseCategory = new ExpenseCategoryRepository(_context);
            Documents = new DocumentRepository(_context);
            Projects = new ProjectRepository(_context);
            Products = new ProductRepository(_context);
            Clients = new ClientRepository(_context);
            ProjectStatus = new ProjectStatusRepository(_context);
            ProjectSource = new ProjectSourceRepository(_context);
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
