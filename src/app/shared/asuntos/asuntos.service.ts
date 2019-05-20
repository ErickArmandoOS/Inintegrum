import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Asunto } from './asuntos.model';
import { Empresa } from '../empresa.model'
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Employee } from '../employee.model';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AsuntosService {
  formData: Asunto;

  asuntos: Asunto[];
  empresa: Empresa[];
  usuario: Employee[];


  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asunto: Observable<Asunto[]>;
  asuntosDoc: AngularFirestoreDocument<Asunto>

  constructor(public firestore: AngularFirestore) {
    this.asuntosCollection = firestore.collection<Asunto>('asuntos');
    this.asunto = this.asuntosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Asunto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  getAsuntos() {
    return this.firestore.collection('asuntos').snapshotChanges();
  }

  getOneAsunto() {
    this.asuntosCollection.doc('control').ref.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return this.firestore.collection('asuntos/control').snapshotChanges();
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }


  getSelectAsu(control: string) {

    this.firestore.firestore.collection('asuntos')
      .where('control', '==', control)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id); // id of doc
          console.log(doc.data()); // data of doc
          return control;
        })
      });
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('tareas/' + id).delete();

    }
  }

  getEmpresas() {
    return this.firestore.collection('empresas').snapshotChanges()
  }

  getUsuarios() {
    return this.firestore.collection('usuarios').snapshotChanges()
  }

  deleteAsunto(asunto: Asunto) {
    for (let i = 0; i < this.asuntos.length; i++) {
      if (asunto == this.asuntos[i]) {
        this.asuntos.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(this.asuntos));
      }
    }
  }


  asuntoselect(control:Asunto) {
    this.asuntosDoc = this.firestore.doc<Asunto>(`asuntos/${control}`);
    console.log(this.asuntosDoc)
  }
}



