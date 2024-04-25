import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import { Routes, provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import {firebaseConfig } from '../app/core/constants/constants'
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AngularFireModule } from '@angular/fire/compat';
import { getAuth, provideAuth,AuthModule} from '@angular/fire/auth';
import { getFirestore, provideFirestore,FirestoreModule} from '@angular/fire/firestore';
import { getDatabase, provideDatabase , DatabaseModule} from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

NgModule({
  imports:[]
})
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
  
    importProvidersFrom([
     AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule,AngularFireDatabaseModule,
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
     provideDatabase(() => getDatabase()), 
    provideFunctions(() => getFunctions()),
     provideMessaging(() => getMessaging())
    ]), provideAnimationsAsync(), provideAnimationsAsync(),
  ],
};