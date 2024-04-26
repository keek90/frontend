import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { IUser } from '../core/models/common.model';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
interface Order {
  orderId: string;
  senderName: string;
  receiverName: string;
  senderAddress:string;
  senderPincode:string;
  senderEmail:string;
  senderContact:string;
  receiverAddress:string;
  receiverPincode:string;
  receiverEmail:string;
 
  // Add other properties as needed
}

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent implements OnInit{
  currentUserUid: string | null = null;
  orders: Order[] = [];
  stat:string | null=null;
  constructor(private afAuth: AngularFireAuth,private db:AngularFireDatabase){}
 ngOnInit(): void {
  this.afAuth.authState.subscribe((user:any) => {
    if (user) {
      // User is logged in, retrieve UID
      this.currentUserUid = user.uid;
    } else {
      // User is not logged in, UID is null
      this.currentUserUid = null;
    }
  //  console.log(this.currentUserUid);
    this.db.list('userdetails').snapshotChanges().subscribe(snaps => {
      this.orders = [];
      snaps.forEach(snap => {
        const key = snap.key;
        const data: any = snap.payload.val();
        if (data.user_uid === this.currentUserUid) {
         // console.log(key);
          const order: Order = {
            orderId: data.order_id,
            senderName: data.sender_name,
            receiverName: data.receiver_name,
            senderAddress:data.sender_address,
            senderPincode:data.pincode_sender,
            senderEmail:data.sender_email,
            senderContact:data.sender_contact,
            receiverAddress:data.receiver_address,
            receiverPincode:data.pincode_receiver,
            receiverEmail:data.receiver_email,
            
            // Add other properties as needed
          };
          this.orders.push(order);
          this.stat='yes';
        }
          // Order found, update step completion status
        

          })
          //console.log(data.order_id);
          
    
          });
          
        
      });
  }
  
 }

  