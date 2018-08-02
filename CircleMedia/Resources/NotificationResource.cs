using DAL.Models;
using System;

namespace CircleMedia.Resources
{
    public class NotificationResource
    {
        public DateTime DateTime { get; set; }

        public NotificationType NotificationType { get; set; }

        public MiniProjectResource Project { get; set; }

    }
}