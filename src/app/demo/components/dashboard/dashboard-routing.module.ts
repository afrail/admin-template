import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {AuthGuard} from "../auth/guards/auth.guard";
import {AppLayoutComponent} from "../../../layout/app.layout.component";

@NgModule({
    imports: [RouterModule.forChild([
        {
            canActivate: [AuthGuard],
            canActivateChild: [AuthGuard],
            path: '', component: AppLayoutComponent,
            children: [
                {
                    path: '',component: DashboardComponent
                },
            ],
        },

    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
