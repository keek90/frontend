import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { TrackComponent } from './track/track.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
{path: '',component:HomeComponent},
{path: 'login',component:LoginComponent},
{path: 'userdetails',component:UserdetailsComponent,canActivate: [AuthGuard]},
{path: 'dashboard',component:DashboardComponent},
{path:'track',component:TrackComponent,canActivate: [AuthGuard]},
{path: 'orderdetails',component:OrderdetailsComponent,canActivate: [AuthGuard]},
{path:'register',component:RegisterComponent},
{path:'payment',component:PaymentComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}