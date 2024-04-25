import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { IUser } from '../core/models/common.model';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent implements OnDestroy{
  data: any;
  private subscription: Subscription;
dataService=inject(DataService);
  constructor() {
    this.subscription = this.dataService.data$.subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
