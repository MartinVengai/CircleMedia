import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { UsersManagementComponent } from './components/controls/users-management.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ViewClientComponent } from './components/view-client/view-client.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { FinancialSettingsComponent } from './components/financial-settings/financial-settings.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "", component: HomeComponent, canActivate: [AuthGuard], data: { title: "Home" } },
            { path: "login", component: LoginComponent, data: { title: "Login" } },
            { path: "products", component: ProductListComponent, canActivate: [AuthGuard], data: { title: "Products" } },
            { path: "products/new", component: ProductsComponent, canActivate: [AuthGuard], data: { title: "Products" } },
            { path: "products/:id", component: ProductsComponent, canActivate: [AuthGuard], data: { title: "Products" } },
            { path: "admin/projects", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "All Projects" } },
            { path: "admin/projects/all/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "admin/projects/completed/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "admin/projects/parked/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "admin/projects/progress/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "admin/projects/pending/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "user/projects/all/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "user/projects/completed/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "user/projects/parked/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "user/projects/progress/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "user/projects/pending/:id", component: ProjectsComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "user/clients/projects/edit/:id", component: ProjectFormComponent, canActivate: [AuthGuard], data: { title: "My Projects" } },
            { path: "settings", component: SettingsComponent, canActivate: [AuthGuard], data: { title: "Settings" } },
            { path: "admin/users", component: UsersManagementComponent, canActivate: [AuthGuard], data: { title: "Manage Users" } },
            { path: "admin/clients", component: ClientListComponent, canActivate: [AuthGuard], data: { title: "Manage Clients" } },
            { path: "admin/clients/new", component: ClientFormComponent, canActivate: [AuthGuard], data: { title: "Manage Clients" } },
            { path: "admin/clients/:id", component: ClientFormComponent, canActivate: [AuthGuard], data: { title: "Manage Clients" } },
            { path: "admin/clients/view/:id", component: ViewClientComponent, canActivate: [AuthGuard], data: { title: "Manage Clients" } },
            { path: "admin/clients/projects/new/:id", component: ProjectFormComponent, canActivate: [AuthGuard], data: { title: "Manage Clients" } },
            { path: "admin/clients/projects/edit/:id", component: ProjectFormComponent, canActivate: [AuthGuard], data: { title: "Manage Clients" } },
            { path: "admin/settings/finance", component: FinancialSettingsComponent, canActivate: [AuthGuard], data: { title: "Finance Settings" } },
            { path: "admin/cashflow", component: CashFlowComponent, canActivate: [AuthGuard], data: { title: "Cash Flow" } },
            { path: "home", redirectTo: "/", pathMatch: "full" },
            { path: "**", component: NotFoundComponent, data: { title: "Page Not Found" } },
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService, AuthGuard
    ]
})
export class AppRoutingModule { }
