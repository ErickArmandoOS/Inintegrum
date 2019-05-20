import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Tarea } from './tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  formData: Tarea;

  constructor(public firestore: AngularFirestore) { }

  getTareas() {
    return this.firestore.collection('tareas').snapshotChanges();
  }
}
