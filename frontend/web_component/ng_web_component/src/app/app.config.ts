import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"edukoshka","appId":"1:414666822895:web:58499a7e3c6ff9f489f71a","databaseURL":"https://edukoshka-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"edukoshka.appspot.com","apiKey":"AIzaSyDS3PSpgDYJyEdpj7hawnmWuZSUVdf59Rs","authDomain":"edukoshka.firebaseapp.com","messagingSenderId":"414666822895"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
