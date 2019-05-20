import { Component, OnInit, Input, Output } from '@angular/core';
import { Asunto } from '../../../../models/asuntos';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AsuntosService } from '../../../../shared/asuntos/asuntos.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { control } from 'leaflet';
import { DataSource } from 'ng2-smart-table/lib/data-source/data-source';
import { EventEmitter } from 'events';


@Component({
  selector: 'ngx-asunto-select',
  templateUrl: './asunto-select.component.html',
  styleUrls: ['./asunto-select.component.scss']
})
export class AsuntoSelectComponent implements OnInit {

  settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      control: {
        title: 'Control',
        filter: false
      },
      expediente: {
        title: 'Expediente',
        filter: false
      },
      empresa: {
        title: 'Empresa',
        filter: false
      },
      ciudad: {
        title: 'Ciudad',
        filter: false
      },
      actor: {
        title: 'Actor',
        filter: false
      },
      junta: {
        title: 'Autoridad',
        filter: false
      },
      ubicacion: {
        title: 'Ubicaciones',
        filter: false
      },
      estatus: {
        title: 'Estatus',
        filter: false
      },
      accion: {
        title: 'Accion',
        filter: false
      }
      
    }
  };

  list: Asunto[];


  lista: LocalDataSource;
 



  controls = 'A001'



  //@Output() save: EventEmitter = new EventEmitter();

  @Input() save

  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntosDoc: AngularFirestoreDocument<Asunto>;

  asuntos: Observable<Asunto[]>;

  constructor(public service: AsuntosService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) {

    // this.lista = new LocalDataSource(
    //   [
    //     {
          
    //       control: "string",
    //       expediente: "string",
    //       empresa: "any",
    //       ciudad: "string",
    //       actor: "string",
    //       junta: "string",
    //       ubicacion: "string",
    //       estatus: "string",
    //       accion: "string"
    //     },
    //     'casa',
    //     'jajaja',
    //     'sdsds',
    //     'sdsdf',
    //     'sdfsdfsdf',
    //     'sdfsdf',
    //     'sdfsdfsd',
    //     'sdfsdfsdf'
    //   ]
    // )
  }

  ngOnInit() {

    console.log(this.save)

     let self = this
     this.firestore.firestore.collection('asuntos')
       //.where('control', '==',`${this.save}`)
       .where('control', '==',`A001`)
       .get()
       .then(querySnapshot => {
         querySnapshot.forEach(function (doc) {
            // console.log(doc.id); // id of doc
            // console.log(doc.data().control);  //data of doc 
              const datos : any = doc.data();       
              self.lista = new LocalDataSource( [datos]);
         });
       });    
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('asuntos/' + id).delete();
      this.toastr.warning('Deleted successfully', 'EMP. Register');
    }
  }

}

    // this.service.getAsuntos().subscribe(actionArray => {
    //   this.list = actionArray.map(item => {
    //     return {
    //       id: item.payload.doc.id,
    //       ...item.payload.doc.data()
    //     } as Asunto;
    //   })
    // });

    // this.ref =this.firestore
    //           .doc('asuntos/' + control)
    //           .get()
    //           .where('control' ,'==' ,control)
    // console.log(this.ref);


 //Obetener un solo valor 
    // this.asuntosCollection = this.firestore.collection('asuntos', ref => {
    //   return ref.where('control', '==', 'A001')
    // });

    // this.asuntos = this.asuntosCollection.valueChanges();

    // this.asuntosDoc = this.firestore.doc('asuntos/2ubOAjEJ6wdzwIkeTa8C')
    // this.asuntos = this.asuntosDoc.valueChanges()