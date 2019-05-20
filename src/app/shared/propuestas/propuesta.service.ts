import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Propuesta } from './propuesta.modal';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {
  formData: Propuesta;

  constructor(public firestore: AngularFirestore) { }

  getPropuestas() {
    return this.firestore.collection('propuestas').snapshotChanges();
  }
}
