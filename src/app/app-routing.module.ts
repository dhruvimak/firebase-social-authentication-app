import { Routes, RouterModule } from "@angular/router";


import { DashboardComponent } from "./view/dashboard/dashboard.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./view/login/login.component";
import { SignupComponent } from "./view/signup/signup.component";


const appRoutes: Routes = [
    {
        path: 'home',
        component: HeaderComponent,
        children: [
            { path: '', component: LoginComponent, outlet: 'welcomepage'},
            { path: 'signup', component: SignupComponent, outlet: 'welcomepage'}
        ]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);