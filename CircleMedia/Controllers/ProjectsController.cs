using AutoMapper;
using CircleMedia.Resources;
using DAL;
using DAL.Core;
using DAL.Core.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CircleMedia.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Projects")]
    public class ProjectsController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAccountManager _accountManager;

        public ProjectsController(IMapper mapper, IUnitOfWork unitOfWork, IAccountManager accountManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _accountManager = accountManager;
        }

        [HttpGet("/api/[controller]/statistics/{userId}")]
        public async Task<List<ProjectCount>> GetProjectsStatistics(string userId)
        {
            return await _unitOfWork.Projects.GetStatistics(userId);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SaveProjectResource saveProjectResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var project = _mapper.Map<SaveProjectResource, Project>(saveProjectResource);

            await _unitOfWork.Projects.AddAsync(project);

            var notification = new Notification(NotificationType.ProjectCreated, project.ProductId, project.AssignedUserId)
            {
                DueDate = project.DueDate
            };

            await _unitOfWork.Notifications.AddAsync(notification);

            await _unitOfWork.CompleteAsync();

            project = await _unitOfWork.Projects.GetAsync(project.Id);

            return Ok(_mapper.Map<Project, ProjectResource>(project));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SaveProjectResource saveProjectResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var project = await _unitOfWork.Projects.GetAsync(id);

            if (project == null)
                return NotFound();

            _mapper.Map(saveProjectResource, project);

            //awaiting approval = 2
            if (project.StatusId == 2)
            {
                var adminUsers = await _accountManager.GetUsersByRole("administrator");

                foreach (var user in adminUsers)
                {
                    var notification = new Notification(NotificationType.ProjectUpdated, project.ProductId, user.Id);
                    await _unitOfWork.Notifications.AddAsync(notification);
                }
            }

            await _unitOfWork.CompleteAsync();

            project = await _unitOfWork.Projects.GetAsync(project.Id);

            return Ok(_mapper.Map<Project, ProjectResource>(project));
        }

        [HttpGet]
        public async Task<QueryResultResource<ProjectResource>> GetProjects(ProjectQueryResource projectQueryResource)
        {
            var filter = _mapper.Map<ProjectQueryResource, ProjectQuery>(projectQueryResource);
            var queryResult = await _unitOfWork.Projects.GetAllAsync(filter);
            return _mapper.Map<QueryResult<Project>, QueryResultResource<ProjectResource>>(queryResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _unitOfWork.Projects.GetAsync(id);

            if (project == null)
                return NotFound();

            return Ok(_mapper.Map<Project, ProjectResource>(project));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _unitOfWork.Projects.GetAsync(id, includeRelated: false);

            if (project == null)
                return NotFound();

            _unitOfWork.Projects.Remove(project);
            await _unitOfWork.CompleteAsync();
            return Ok(id);
        }

        [HttpGet, Route("/api/projects/sources")]
        public async Task<IActionResult> GetSources()
        {
            var projectSources = await _unitOfWork.ProjectSource.GetAllAsync();
            return Ok(projectSources);
        }

        [HttpGet, Route("/api/projects/status")]
        public async Task<IActionResult> GetStatus()
        {
            return Ok(await _unitOfWork.ProjectStatus.GetAllAsync());
        }
    }
}