using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsRead { get; set; }
        public NotificationType Type { get; set; }

        [Required]
        public int ProductId { get; set; }
        public Product Product { get; set; }
        [Required]
        public string AssignedUserId { get; set; }
        public ApplicationUser AssignedUser { get; set; }

        protected Notification()
        {
        }

        public Notification(NotificationType type, int productId, string userId)
        {
            AssignedUserId = userId;
            ProductId = productId;
            Type = type;
            DateTime = DateTime.Now;
        }
    }
}