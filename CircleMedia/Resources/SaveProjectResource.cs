
using System;

namespace CircleMedia.Resources
{
    public class SaveProjectResource
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public decimal Amount { get; set; }
        public decimal Deposit { get; set; }
        public decimal? Balance { get; set; }
        public DateTime DateReceived { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime DateCompleted { get; set; }
        public int StatusId { get; set; }
        public int ProductId { get; set; }
        public int ClientId { get; set; }
        public string AssignedUserId { get; set; }

    }
}