import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { HomeComponent } from './home/home.component';
import { FacultyLoginComponent } from './faculty-login/faculty-login.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { FormsModule } from '@angular/forms';
import { CourseComponent } from './course/course.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    QrCodeComponent,
    HomeComponent,
    FacultyLoginComponent,
    TakeAttendanceComponent,
    ManageStudentComponent,
    GenerateCodeComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
