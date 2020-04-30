import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Service/auth-guard.service';
import { SpendingOverviewComponent } from './spending-overview/spending-overview.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'spendings',
    component: SpendingOverviewComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'spendings', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
