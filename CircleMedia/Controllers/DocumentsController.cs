using AutoMapper;
using CircleMedia.Resources;
using DAL;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CircleMedia.Controllers
{
    [Produces("application/json")]
    [Route("api/projects/{projectId}/documents")]
    public class DocumentsController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _host;
        private readonly DocumentSettings _documentSettings;

        public DocumentsController(IUnitOfWork unitOfWork, IMapper mapper, IHostingEnvironment host, IOptionsSnapshot<DocumentSettings> options)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _host = host;
            _documentSettings = options.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int projectId, IFormFile file)
        {
            var project = await _unitOfWork.Projects.GetAsync(projectId);

            if (project == null)
                return NotFound();

            if (file == null)
                return BadRequest("The file can not be null");
            if (file.Length <= 0)
                return BadRequest("The file cannot be empty");
            if (file.Length > _documentSettings.MaxBytes)
                return BadRequest("The max file size was exceeded");
            if (!_documentSettings.IsSupported(file.FileName))
                return BadRequest("Invalid file type");

            var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads/payments");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var filePath = Path.Combine(uploadsFolderPath, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var document = new Document { FileName = file.FileName };
            project.Documents.Add(document);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Document, DocumentResource>(document));
        }

        [HttpGet]
        public async Task<IActionResult> GetDocuments(int projectId)
        {
            var documents = await _unitOfWork.Documents.GetAllAsync(projectId);

            return Ok(_mapper.Map<IEnumerable<Document>, IEnumerable<DocumentResource>>(documents));
        }

    }
}