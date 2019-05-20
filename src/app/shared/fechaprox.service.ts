import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Fecha } from './fechaprox.model';

@Injectable({
  providedIn: 'root'
})
export class FechaproxService {
  formData: Fecha;

  constructor(public firestore: AngularFirestore) { }

  getFechas() {
    return this.firestore.collection('fechas').snapshotChanges();
  }
}
