import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {LoginComponent} from "./demo/components/auth/login/login.component";

@NgModule({
    imports: [
        RouterModule.forRoot([  {
            path: 'dashboard',
            loadChildren: () => import('./demo/components/dashboard/dashboard.module')
                .then(m => m.DashboardModule),
        },
            {
                path: 'auth',
                children: [
                    {
                        path: '',
                        component: LoginComponent,
                    },
                    {
                        path: 'login',
                        component: LoginComponent,
                    }
                ],
            },
            { path: '', redirectTo: 'auth', pathMatch: 'full' },
            {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},
            { path: '**', redirectTo: 'dashboard' },
        ],)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
