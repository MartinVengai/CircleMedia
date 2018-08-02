using System;

namespace DAL.Models
{
    public class UserNotification
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int NotificationId { get; set; }
        public Notification Notification { get; set; }
        public bool IsRead { get; set; }

        protected UserNotification()
        {
        }

        public UserNotification(ApplicationUser user, Notification notification)
        {
            User = user ?? throw new ArgumentNullException(nameof(user));
            Notification = notification ?? throw new ArgumentNullException(nameof(notification));
        }
    }
}