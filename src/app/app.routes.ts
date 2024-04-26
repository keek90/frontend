import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { TrackComponent } from './track/track.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
{path: '',component:HomeComponent},
{path: 'login',component:LoginComponent},
{path: 'userdetails',component:UserdetailsComponent},
{path: 'dashboard',component:DashboardComponent},
{path:'track',component:TrackComponent},
{path: 'orderdetails',component:OrderdetailsComponent},
{path:'register',component:RegisterComponent},
];
