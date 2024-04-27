import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CheckoutService } from '../service/checkout.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
interface Order {
  orderId: string;
  senderName: string;
  receiverName: string;
  
 
  // Add other properties as needed
}
@Component({
  selector: 'app-payment',
  standalone: true, // Ensure standalone is supported in your Angular version
  imports: [HttpClientModule,RouterModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'] // Corrected styleUrls (plural)
})

export class PaymentComponent implements OnInit {
  paymentHandler: any; // Initialized variable
  currentUserUid: string | null = null;
  orders: Order[] = [];
  constructor(private checkout: CheckoutService,private afAuth: AngularFireAuth,private db:AngularFireDatabase)
  {

  }
  ngOnInit() {
    this.invokeStripe(); // Proper function call in `ngOnInit`
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
              
              
              // Add other properties as needed
            };
            this.orders.push(order);
            
          }
            // Order found, update step completion status
          
  
            })
            //console.log(data.order_id);
            
      
            });
            
          
        });
  }

  makePayment(amount: number) {
    const paymentHandler = (window as any).StripeCheckout.configure({
      key: 'pk_test_51P2vkoSAEiT15doWH3CqEmQ90JSv0gVIJAD4VYPRu70q4zSmM1rqR9bQkbxDtUvv0LrjSmCpGw684uG9q45AoOMD00ki5lysRn', // Ensure correct public key
      locale: 'auto',
      token: function (stripeToken: any){ // Use arrow function for correct `this`
        console.log(stripeToken) 

        paymentStripe(stripeToken)
        {}
      },
    });
    const paymentStripe = (stripeToken: any)=>{
      this.checkout.makePayment(stripeToken).subscribe((data : any)=>{
        console.log(data);
      })
    }
    paymentHandler.open({
      name: 'ExpressD',
      description: 'Parcel Delivery',
      amount: amount * 100, // Stripe expects amount in cents
    });
  }


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (window as any).StripeCheckout.configure({
          key: 'pk_test_51P2vkoSAEiT15doWH3CqEmQ90JSv0gVIJAD4VYPRu70q4zSmM1rqR9bQkbxDtUvv0LrjSmCpGw684uG9q45AoOMD00ki5lysRn', // Ensure this is your Stripe key
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log('Stripe Token:', stripeToken);
          },
        });
      };
      window.document.body.appendChild(script); // Append script to the DOM
    }
  }
}
