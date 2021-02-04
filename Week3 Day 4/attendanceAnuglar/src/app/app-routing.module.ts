import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { ProfileComponent } from './profile/profile.component';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { FacultyLoginComponent } from './faculty-login/faculty-login.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { TakeAttendanceComponent} from './take-attendance/take-attendance.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  { path: '', 
    component: HomeComponent 
  },
  {
    path: 'manage-student',
    component: ManageStudentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path:'generate-code',
    component: GenerateCodeComponent
  },
  {
    path:'faculty-course',
    component: CourseComponent
  },
  {
    path:'faculty-login',
    component:FacultyLoginComponent

  },
  {
    path:'qr-code',
    component:QrCodeComponent
  },
  {
    path:'take-attendance',
    component:TakeAttendanceComponent
  },
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
