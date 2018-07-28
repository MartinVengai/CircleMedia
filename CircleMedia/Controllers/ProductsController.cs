using AutoMapper;
using CircleMedia.Resources;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CircleMedia.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Products")]
    public class ProductsController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ProductsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] ProductResource productResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = _mapper.Map<ProductResource, Product>(productResource);
            await _unitOfWork.Products.AddAsync(product);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Product, ProductResource>(product));
        }

        [HttpGet]
        public async Task<IEnumerable<ProductResource>> GetProducts()
        {
            var products = await _unitOfWork.Products.GetAllAsync();

            return _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _unitOfWork.Products.GetAsync(id);

            if (product == null)
                return NotFound();

            return Ok(_mapper.Map<Product, ProductResource>(product));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] ProductResource productResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _unitOfWork.Products.GetAsync(id);

            if (product == null)
                return NotFound();

            _mapper.Map(productResource, product);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Product, ProductResource>(product));
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            var product = await _unitOfWork.Products.GetAsync(id);

            if (product == null)
                return NotFound();

            _unitOfWork.Products.Remove(product);
            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }
    }
}