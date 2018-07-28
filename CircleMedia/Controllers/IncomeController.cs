using AutoMapper;
using CircleMedia.Resources;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CircleMedia.Controllers
{
    [Produces("application/json")]
    [Route("api/Income")]
    public class IncomeController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public IncomeController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var incomes = _unitOfWork.Income.GetAllGrouped();
            //            return Ok(_mapper.Map<IEnumerable<Income>, IEnumerable<IncomeResource>>(incomes));

            return Ok(incomes);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SaveIncomeResource incomeResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var income = _mapper.Map<SaveIncomeResource, Income>(incomeResource);

            await _unitOfWork.Income.AddAsync(income);
            await _unitOfWork.CompleteAsync();

            income = await _unitOfWork.Income.GetAsync(income.Id);

            return Ok(_mapper.Map<Income, IncomeResource>(income));
        }
    }
}