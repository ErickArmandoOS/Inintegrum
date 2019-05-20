import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Suceso } from './suceso.modal';

@Injectable({
  providedIn: 'root'
})
export class SucesoService {
  formData: Suceso;

  constructor(public firestore: AngularFirestore) { }

  getSucesos() {
    return this.firestore.collection('sucesos').snapshotChanges();
  }

  // dbs(){
  //   this.firestore.collection("sucesos").where("control", "==", `A001`)
  //   .get()
  //   .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //           // doc.data() is never undefined for query doc snapshots
  //           console.log(doc.id, " => ", doc.data());
  //       });
  //   })
  //   .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //   });
  // }
}
