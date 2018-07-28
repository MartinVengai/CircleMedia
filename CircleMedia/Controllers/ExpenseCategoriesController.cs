using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CircleMedia.Controllers
{
    [Produces("application/json")]
    [Route("api/ExpenseCategories")]
    public class ExpenseCategoriesController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public ExpenseCategoriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await _unitOfWork.ExpenseCategory.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ExpenseCategory expenseCategory)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _unitOfWork.ExpenseCategory.AddAsync(expenseCategory);
            await _unitOfWork.CompleteAsync();

            return Ok(expenseCategory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _unitOfWork.ExpenseCategory.GetAsync(id);

            if (category == null)
                return NotFound();

            _unitOfWork.ExpenseCategory.Remove(category);
            await _unitOfWork.CompleteAsync();
            return Ok(id);
        }

    }
}