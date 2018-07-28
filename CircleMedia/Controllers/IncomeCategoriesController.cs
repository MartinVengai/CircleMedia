using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CircleMedia.Controllers
{
    [Produces("application/json")]
    [Route("api/IncomeCategories")]
    public class IncomeCategoriesController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public IncomeCategoriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetIncomeCategories()
        {
            return Ok(await _unitOfWork.IncomeCategory.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] IncomeCategory incomeCategory)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _unitOfWork.IncomeCategory.AddAsync(incomeCategory);
            await _unitOfWork.CompleteAsync();

            return Ok(incomeCategory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _unitOfWork.IncomeCategory.GetAsync(id);

            if (category == null)
                return NotFound();

            _unitOfWork.IncomeCategory.Remove(category);
            await _unitOfWork.CompleteAsync();
            return Ok(id);
        }
    }
}