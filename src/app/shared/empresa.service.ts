import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Empresa } from './empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  formData: Empresa;
  

  constructor(public firestore: AngularFirestore) { }

  getEmpresas() {
    return this.firestore.collection('empresas').snapshotChanges();
  }

  getOneEmpresa(){
    return this.firestore.collection('empresas').valueChanges();    
  }
}
