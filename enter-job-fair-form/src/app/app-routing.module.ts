import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormConfirmComponent } from './form-confirm/form-confirm.component';
import { FormSubmitComponent } from './form-submit/form-submit.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { OverviewComponent } from './overview/overview.component';
import { UniversityComponent } from './university/university.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';

const routes: Routes = [
  {path: "", component: LandingPageComponent, data: {animation: "LandingPage"}},
  {path: "login", component: LoginComponent},
  {path: "login/adminpanel", component: AdminComponent, children: [
    {path: "", component: AdminLandingComponent},
    {path: "overview", component: OverviewComponent},
    {path: "universities", component: UniversityComponent}
  ]},
  {path: "job-fair-form", component: FormComponent, data: {animation: "FormPage"}},
  {path: "job-fair-form/confirm", component: FormConfirmComponent},
  {path: "job-fair-form/confirm/submit", component: FormSubmitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
