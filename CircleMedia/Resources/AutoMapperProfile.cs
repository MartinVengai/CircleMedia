using AutoMapper;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace CircleMedia.Resources
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Notification, NotificationResource>()
                .ForMember(n => n.Project, map => map.MapFrom(nr => nr.Project));

            CreateMap<Income, SaveIncomeResource>()
                .ReverseMap();

            CreateMap<Client, ClientResource>()
                .ForMember(cr => cr.ProjectsCount, opt => opt.MapFrom(c => c.Projects.Count))
                .ForMember(c => c.ProjectsCompleted,
                    opt => opt.MapFrom(c => c.Projects.Count(p => p.Status.Name == "Completed")));

            CreateMap<Client, SaveClientResource>()
                .ReverseMap();

            CreateMap<ClientQuery, ClientQueryResource>()
                .ReverseMap();

            CreateMap<ApplicationUser, ReadUserResource>()
                .ReverseMap();
            CreateMap<Document, DocumentResource>()
                .ReverseMap();
            CreateMap<Project, SaveProjectResource>()
                .ReverseMap();

            CreateMap<Project, ProjectResource>()
                .ReverseMap();

            CreateMap<Client, SimpleClientResource>()
                .ReverseMap();

            CreateMap<SaveProjectResource, Project>()
                .ReverseMap();

            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));

            CreateMap<ApplicationUser, UserResource>()
                   .ForMember(d => d.Roles, map => map.Ignore());

            CreateMap<UserResource, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore());

            CreateMap<ApplicationUser, UserEditResource>()
                .ForMember(d => d.Roles, map => map.Ignore());
            CreateMap<UserEditResource, ApplicationUser>()
                .ForMember(d => d.Roles, map => map.Ignore());

            CreateMap<ApplicationUser, UserPatchViewModel>()
                .ReverseMap();

            CreateMap<ApplicationRole, RoleViewModel>()
                .ForMember(d => d.Permissions, map => map.MapFrom(s => s.Claims))
                .ForMember(d => d.UsersCount, map => map.ResolveUsing(s => s.Users?.Count ?? 0))
                .ReverseMap();
            CreateMap<RoleViewModel, ApplicationRole>();

            CreateMap<IdentityRoleClaim<string>, ClaimViewModel>()
                .ForMember(d => d.Type, map => map.MapFrom(s => s.ClaimType))
                .ForMember(d => d.Value, map => map.MapFrom(s => s.ClaimValue))
                .ReverseMap();

            CreateMap<ApplicationPermission, PermissionViewModel>()
                .ReverseMap();

            CreateMap<IdentityRoleClaim<string>, PermissionViewModel>()
                .ConvertUsing(s => Mapper.Map<PermissionViewModel>(ApplicationPermissions.GetPermissionByValue(s.ClaimValue)));

            CreateMap<Customer, CustomerViewModel>()
                .ReverseMap();

            CreateMap<Product, ProductResource>()
                .ReverseMap();

            CreateMap<Order, OrderViewModel>()
                .ReverseMap();
        }
    }
}
