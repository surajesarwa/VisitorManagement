// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CreateComponent } from './component/create/create.component';
import { SearchComponent } from './component/search/search.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { MaterialComponent } from './material/material.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent,
        pathMatch:'full'
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent, // HomeComponent now acts as the container
        children: [ // Child routes are defined here
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'create',
                component: CreateComponent,
                pathMatch: 'full'
            },
            {
                path: 'search',
                component: SearchComponent,
                pathMatch: 'full'
            },
            {
                path:'visitor-list',
                component:VisitorListComponent,
                pathMatch:'full'
            },
            {
                path:'material',
                component:MaterialComponent,
                pathMatch:'full'
            },

        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    },

];