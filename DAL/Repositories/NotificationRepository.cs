using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class NotificationRepository : Repository<Notification>, INotificationRepository
    {
        private readonly ApplicationDbContext _context;

        public NotificationRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Notification>> GetAsync()
        {
            var notifications = await _context.UserNotification
                .Where(un => un.UserId == _context.CurrentUserId)
                .Select(un => un.Notification)
                .Include(n => n.Project.AssignedUser)
                .Include(n => n.Project.Product)
                .ToListAsync();

            return notifications;
        }
    }
}