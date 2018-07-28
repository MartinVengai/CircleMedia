using System;

namespace CircleMedia.Resources
{
    //    [JsonObject(IsReference = true)]
    public class ProjectResource
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public decimal Amount { get; set; }
        public decimal Deposit { get; set; }
        public decimal? Balance { get; set; }
        public DateTime DateReceived { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? DateCompleted { get; set; }
        public int DaysRemaining { get; set; }
        public SimpleClientResource Client { get; set; }
        public ProductResource Product { get; set; }
        public KeyValuePairResource Status { get; set; }
        public UserViewModel AssignedUser { get; set; }

    }
}