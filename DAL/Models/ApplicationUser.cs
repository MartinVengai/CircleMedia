using DAL.Models.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DAL.Models
{
    public class ApplicationUser : IdentityUser, IAuditableEntity
    {
        public virtual string FriendlyName
        {
            get
            {
                var friendlyName = string.IsNullOrWhiteSpace(FullName) ? UserName : FullName;

                if (!string.IsNullOrWhiteSpace(JobTitle))
                    friendlyName = $"{JobTitle} {friendlyName}";

                return friendlyName;
            }
        }

        public string JobTitle { get; set; }
        public string FullName { get; set; }
        public string Configuration { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsLockedOut => this.LockoutEnabled && this.LockoutEnd >= DateTimeOffset.UtcNow;

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }


        public ICollection<UserNotification> UserNotifications { get; set; }

        public ApplicationUser()
        {
            UserNotifications = new Collection<UserNotification>();
        }
        public void Notify(Notification notification)
        {
            UserNotifications.Add(new UserNotification(this, notification));
        }
        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }
    }
}
