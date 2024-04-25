import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../core/models/common.model';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
export interface Step {
  label: string;
  completed: boolean;
}
@Component({
  selector: 'app-track',
  standalone: true,
  imports: [MatStepperModule,MatIconModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})

export class TrackComponent {
  details: IUser[]=[];
  constructor(private userService:UserService, private router:Router,private db:AngularFireDatabase){
    
    
   
  }
  steps: Step[] = [
    
    { label: 'Booked', completed: false },
    { label: 'Pickup', completed: false },
    { label: 'In_Transit', completed: false },
    { label: 'Out_for_Delivery', completed: false },
    { label: 'Delivered', completed: false }
  ];


  trackOrder(orderNum:string):void {
    this.steps.forEach(step => step.completed = false);

    // Fetch order details from Firebase
    this.db.list('userdetails').snapshotChanges().subscribe(snaps => {
      snaps.forEach(snap => {
        const key = snap.key;
        const data: any = snap.payload.val();
        if (data.order_id === orderNum) {
          console.log(key);
          // Order found, update step completion status
          this.steps.forEach(step => {
            if (data.trackdetails && data.trackdetails[step.label]) {
              //console.log(data.trackdetails[step.label]);
              //console.log(step);
              step.completed = true;
            }
          });
        }
      });
    });
  }
  }


 