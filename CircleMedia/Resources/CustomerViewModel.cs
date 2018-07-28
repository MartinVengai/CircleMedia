// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using System.Collections.Generic;
using FluentValidation;

namespace CircleMedia.Resources
{
    public class CustomerViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }

        public ICollection<OrderViewModel> Orders { get; set; }
    }




    public class CustomerViewModelValidator : AbstractValidator<CustomerViewModel>
    {
        public CustomerViewModelValidator()
        {
            DefaultValidatorExtensions.NotEmpty(RuleFor(register => register.Name)).WithMessage("Customer name cannot be empty");
            DefaultValidatorExtensions.NotEmpty(RuleFor(register => register.Gender)).WithMessage("Gender cannot be empty");
        }
    }
}
