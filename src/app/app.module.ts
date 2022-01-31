import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './assignments/card/card.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { Select } from './assignments/select-multiple/select-multiple-component'
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxPaginationModule } from 'ngx-pagination';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
















const routes: Routes = [
  {
    path: "", component: AssignmentsComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "home", component: AssignmentsComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "add", component: AddAssignmentComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "assignment/:id", component: AssignmentDetailComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "assignment/:id/edit", component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "login", component: LoginComponent
  },
  {
    path: "register", component: RegisterComponent
  },

]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    CardComponent,
    EditAssignmentComponent,
    Select,
    LoginComponent,
    RegisterComponent,





  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule, MatIconModule, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule, HttpClientModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatPaginatorModule,
    MatSelectModule,
    DragDropModule,
    NgxPaginationModule,
    MatStepperModule,
    MatIconModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,


    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
