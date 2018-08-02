using DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CircleMedia.Resources;
using DAL.Models;

namespace CircleMedia.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Notifications")]
    public class NotificationsController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NotificationsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IEnumerable<NotificationResource>> GetNewNotifications()
        {
            var notifications = await _unitOfWork.Notifications.GetAsync();

            return _mapper.Map<IEnumerable<NotificationResource>>(notifications);
        }
    }
}