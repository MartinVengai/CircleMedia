using AutoMapper;
using CircleMedia.Resources;
using DAL;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CircleMedia.Controllers
{
    [Authorize(Roles = "administrator")]
    [Produces("application/json")]
    [Route("api/Clients")]
    public class ClientsController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ClientsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<QueryResultResource<ClientResource>> GetClients(ClientQueryResource clientQueryResource)
        {
            var filter = _mapper.Map<ClientQueryResource, ClientQuery>(clientQueryResource);
            var queryResult = await _unitOfWork.Clients.GetAllAsync(filter);
            return _mapper.Map<QueryResult<Client>, QueryResultResource<ClientResource>>(queryResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await _unitOfWork.Clients.GetAsync(id);

            if (client == null)
                return NotFound();

            return Ok(_mapper.Map<Client, ClientResource>(client));
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SaveClientResource saveClientResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var client = _mapper.Map<SaveClientResource, Client>(saveClientResource);

            await _unitOfWork.Clients.AddAsync(client);
            await _unitOfWork.CompleteAsync();

            client = await _unitOfWork.Clients.GetAsync(client.Id);

            return Ok(_mapper.Map<Client, ClientResource>(client));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SaveClientResource saveClientResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var client = await _unitOfWork.Clients.GetAsync(id);

            if (client == null)
                return NotFound();

            _mapper.Map(saveClientResource, client);
            await _unitOfWork.CompleteAsync();

            client = await _unitOfWork.Clients.GetAsync(client.Id);

            return Ok(_mapper.Map<Client, ClientResource>(client));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var client = await _unitOfWork.Clients.GetAsync(id, includeRelated: false);

            if (client == null)
                return NotFound();

            _unitOfWork.Clients.Remove(client);
            await _unitOfWork.CompleteAsync();
            return Ok(id);
        }

    }
}