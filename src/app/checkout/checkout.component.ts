import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  currentUserUid: string | null = null;
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
    console.log(this.currentUserUid);
    this.db.list('userdetails').snapshotChanges().subscribe(snaps => {
      snaps.forEach(snap => {
        const key = snap.key;
        const data: any = snap.payload.val();
        if (data.user_uid === this.currentUserUid) {
          console.log(key);
          // Order found, update step completion status
          
          console.log(data.order_id);
          
            }
          });
        
      });
  });
  
 }
}
