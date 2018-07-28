using DAL.Core;
using DAL.Core.Interfaces;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace DAL
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }

    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly IAccountManager _accountManager;
        private readonly ILogger _logger;

        public DatabaseInitializer(ApplicationDbContext context, IAccountManager accountManager, ILogger<DatabaseInitializer> logger)
        {
            _accountManager = accountManager;
            _context = context;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);
            var result = await _context.Users.AnyAsync();
            if (!await _context.Users.AnyAsync())
            {
                _logger.LogInformation("Generating inbuilt accounts");

                const string adminRoleName = "administrator";
                const string userRoleName = "user";

                await EnsureRoleAsync(adminRoleName, "Default administrator", ApplicationPermissions.GetAllPermissionValues());
                await EnsureRoleAsync(userRoleName, "Default user", new string[] { });

                await CreateUserAsync("admin", "tempP@ss123", "Administrator", "info@circlemedia.co.za", "+1 (123) 000-0000", new string[] { adminRoleName });
                await CreateUserAsync("Nyasha", "tempP@ss123", "Standard User", "nyasha@circlemedia.co.za", "+1 (123) 000-0001", new string[] { userRoleName });
                await CreateUserAsync("Grace", "tempP@ss123", "Administrator", "info@circlemedia.co.za", "+1 (123) 000-0001", new string[] { adminRoleName });
                await CreateUserAsync("Martin", "tempP@ss123", "Standard User", "info@circlemedia.co.za", "+1 (123) 000-0001", new string[] { userRoleName });
                await CreateUserAsync("User1", "tempP@ss123", "Standard User", "info@circlemedia.co.za", "+1 (123) 000-0001", new string[] { userRoleName });
                await CreateUserAsync("User2", "tempP@ss123", "Standard User", "info@circlemedia.co.za", "+1 (123) 000-0001", new string[] { userRoleName });
                await CreateUserAsync("User3", "tempP@ss123", "Standard User", "info@circlemedia.co.za", "+1 (123) 000-0001", new string[] { userRoleName });
                _logger.LogInformation("Inbuilt account generation has completed");
            }

            if (!await _context.ProjectSources.AnyAsync())
            {
                _logger.LogInformation("Seeding initial data");
                var source1 = new ProjectSource { Name = "Facebook" };
                var source2 = new ProjectSource { Name = "Google" };
                var source3 = new ProjectSource { Name = "Reference" };
                var source4 = new ProjectSource { Name = "Website" };

                _context.ProjectSources.AddRange(source4, source3, source2, source1);
                _logger.LogInformation("Seeding initial data completed");
            }

            if (!await _context.ProjectStatuses.AnyAsync())
            {
                _logger.LogInformation("Seeding initial data");

                var pS1 = new ProjectStatus { Name = "Parked" };
                var pS2 = new ProjectStatus { Name = "In Progress" };
                var pS3 = new ProjectStatus { Name = "Awaiting Approval" };
                var pS4 = new ProjectStatus { Name = "Completed" };

                _context.ProjectStatuses.AddRange(pS4, pS3, pS2, pS1);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Seeding initial data completed");
            }

        }

        private async Task EnsureRoleAsync(string roleName, string description, string[] claims)
        {
            if ((await _accountManager.GetRoleByNameAsync(roleName)) == null)
            {
                var applicationRole = new ApplicationRole(roleName, description);

                var result = await this._accountManager.CreateRoleAsync(applicationRole, claims);

                if (!result.Item1)
                    throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");
            }
        }

        private async Task<ApplicationUser> CreateUserAsync(string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
        {
            var applicationUser = new ApplicationUser
            {
                UserName = userName,
                FullName = fullName,
                Email = email,
                PhoneNumber = phoneNumber,
                EmailConfirmed = true,
                IsEnabled = true
            };

            var result = await _accountManager.CreateUserAsync(applicationUser, roles, password);

            if (!result.Item1)
                throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");

            return applicationUser;
        }
    }
}
