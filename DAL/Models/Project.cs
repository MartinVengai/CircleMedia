using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Project
    {
        public int Id { get; set; }
        [StringLength(500)]
        public string Comment { get; set; }
        public decimal Amount { get; set; }
        public decimal Deposit { get; set; }
        public decimal? Balance { get; set; }
        public DateTime DateReceived { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? DateCompleted { get; set; }

        [Required]
        public int StatusId { get; set; }
        [Required]
        public string AssignedUserId { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int ClientId { get; set; }

        [NotMapped]
        public int GetDaysRemaining
        {
            get
            {
                var daysRemaining = (DueDate - DateTime.Now).Days;

                if (StatusId == 1)
                    return 4;

                if (daysRemaining <= 2)
                    return 1;

                if (daysRemaining == 3)
                    return 2;

                return 3;

            }
        }

        public Client Client { get; set; }
        public Product Product { get; set; }
        public ProjectStatus Status { get; set; }
        public ApplicationUser AssignedUser { get; set; }
        public ICollection<Document> Documents { get; set; }

        public Project()
        {
            Documents = new Collection<Document>();
        }
    }
}
