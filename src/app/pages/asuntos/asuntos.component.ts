import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AsuntosService } from '../../shared/asuntos/asuntos.service';
import { EmpresaService } from '../../shared/empresa.service';
import { Empresa } from '../../shared/empresa.model';
import { Observable } from 'rxjs';
import { Asunto } from '../../models/asuntos';
import { Employee } from '../../shared/employee.model';




@Component({
  selector: 'ngx-asuntos',
  templateUrl: './asuntos.component.html',
  styleUrls: ['./asuntos.component.scss']
})
export class AsuntosComponent implements OnInit {

  list: Asunto[];

  @Input()  selectOne 

  

  @Output() closeModalEvent = new EventEmitter<boolean>();

  empresasCollection: AngularFirestoreCollection<Empresa>;
  empresas : Observable<Empresa[]>;

  usuariosCollection : AngularFirestoreCollection<Employee>;
  usuarios: Observable<Employee[]>

  lst = this.empresas;
  

  constructor(public service: AsuntosService,
    public firestore: AngularFirestore,
    private toastr: ToastrService) {

      this.empresasCollection = this.firestore.collection('empresas')
      this.empresas = this.empresasCollection.valueChanges() 
  
      this.usuariosCollection = this.firestore.collection('usuarios')
      this.usuarios = this.usuariosCollection.valueChanges()
     }


     selectControl(){

       
     }

  ngOnInit() {
    this.resetForm();
    
    // this.firestore.collection('asuntos').valueChanges().subscribe(
    //   val => console.log(val)
    // );
      // this.firestore.collection('usuarios')
      // .valueChanges()
      // .subscribe(
      //   val => console.log(val)
      // );

  }

  obtEmpresas(){

    this.resetForm()
    // this.empresasCollection = this.firestore.collection('empresas')
    // this.empresas = this.empresasCollection.valueChanges() 

    // this.usuariosCollection = this.firestore.collection('usuarios')
    // this.usuarios = this.usuariosCollection.valueChanges()
  }

 

   resetForm(form?: NgForm) {
     if (form != null)
       form.resetForm();
     this.service.formData = {
       id: null,
       control: '',
       expediente: '',
       empresa: '',
       ciudad: '',
       actor: '',
       junta: '',
       ubicacion: '',  //Esta en duda su funcionamiento
       estatus: '',
       accion: ''
     }  
   }

   
   onSubmit(form: NgForm) {
     
     let data = Object.assign({}, form.value);
     delete data.id;
     if (form.value.id == null)
       this.firestore.collection('asuntos').add(data);
     else
       this.firestore.doc('asuntos/' + form.value.id).update(data);
     this.resetForm(form);
     this.toastr.success('Submitted successfully', 'Asunto creado');
   }

  //  getOnce(control:string):any{
  //   let asunto:any = this.list.filter((asunto)=>{return asunto.$control == control});
  //   console.log(asunto[0]);
  //   asunto[0] = this.selectOne;
  //   return asunto[0];
  // }

}



     

    //  getO(asunto:any){
    //    this.selectOne = asunto;
    //  }