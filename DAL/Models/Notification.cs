using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public DateTime DateTime { get; set; }

        public NotificationType NotificationType { get; set; }

        [Required]
        public Project Project { get; set; }

        public ICollection<UserNotification> UserNotifications { get; set; }

        protected Notification()
        {
        }

        public Notification(NotificationType notificationType, Project project)
        {
            NotificationType = notificationType;
            Project = project ?? throw new ArgumentNullException(nameof(project));
            DateTime = DateTime.Now;
        }
    }
}