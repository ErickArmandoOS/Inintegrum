import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { SucesoService } from '../../../../../shared/sucesos/suceso.service';
import { Suceso } from '../../../../../shared/sucesos/suceso.modal';
import { SborrarbuttonComponent } from '../buttons/sborrarbutton/sborrarbutton.component';
import { SeditarbuttonComponent } from '../buttons/seditarbutton/seditarbutton.component';
import { LocalDataSource } from 'ng2-smart-table';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { EmplistComponent } from '../buttons/emplist/emplist.component';
import { Asunto } from '../../../../../models/asuntos';
import { database } from 'firebase';
import { DataSet } from 'ng2-smart-table/lib/data-set/data-set';

@Component({
  selector: 'ngx-sucesos-list',
  templateUrl: './sucesos-list.component.html',
  styleUrls: ['./sucesos-list.component.scss']
})
export class SucesosListComponent implements OnInit {




  settings = {
    actions: false,
    columns: {
      control: {
        title: 'Control'
      },
      numero: {
        title: 'Número'
      },
      empresa: {
        title: 'Empresa',
        // type: 'custom',
        // renderComponent: EmplistComponent,
        // onComponentInitFunction(instance) {
        //   instance.save.subscribe(row => {

        //   });
        // },
      },
      fecha: {
        title: 'Fecha'
      },
      suceso: {
        title: 'Suceso'
      },
      atendio: {
        title: 'Atendió'
      },
      desc: {
        title: 'Descripción'
      },
      pdf: {
        title: 'PDF'
      },
      enviar: {
        title: 'Enviar'
      },
      delete: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: SborrarbuttonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {

          });
        },

      },
      edit: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: SeditarbuttonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {

          });
        }

      }
    }
  };

  list: Suceso[];
  //lista: LocalDataSource;

  lista: LocalDataSource;

  dataSet = new Array;
  i=0;

  constructor(public service: SucesoService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) {

    //this.lista = new LocalDataSource(this.datos);

    //    this.lista = new LocalDataSource(
    //      [
    //        {

    //          control: "string",
    //          expediente: "string",
    //          empresa: "any",
    //          ciudad: "string",
    //          actor: "string",
    //          junta: "string",
    //          ubicacion: "string",
    //          estatus: "string",
    //          accion: "string"
    //        },

    //      ]
    //    )

  }

  ngOnInit() {
    this.service.getSucesos().subscribe(actionArray => {
       this.list = actionArray.map(item => {
         return {
           id: item.payload.doc.id,
           ...item.payload.doc.data()
         } as Suceso;
       })
     });

    let self = this;

    // this.firestore.firestore.collection('sucesos')
    //   .where('control', '==', 'A001')
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(function (doc) {
    //       // console.log(doc.id); // id of doc
    //       // console.log(doc.data()); // data of doc 
    //       const datos : any = doc.data();       
    //        self.lista = new LocalDataSource([datos]);
    //       // console.log(self1.lista);
    //     });
    //   });


    // this.firestore.firestore.collection('sucesos')
    //   .where('control', '==', 'A001')
    //   .get()
    //   .then(function (querySnapshot) {
        
    //     querySnapshot.forEach(function (doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       //console.log(doc.id, " => ", doc.data());
    //       //let datos: any[] = [doc.data()]}
    //       //self.lista = new LocalDataSource(doc.data().control);
    //       self.dataSet.push(
    //         [
    //           doc.data().control, 
    //           doc.data().numero,
    //           doc.data().empresa,
    //           doc.data().fecha,
    //           doc.data().suceso,
    //           doc.data().atendio,
    //           doc.data().desc,
    //         ]
    //         );
            
          
          
    //     });
    //     console.log(self.dataSet)
    //     self.lista = new LocalDataSource(self.dataSet);
    //   })
    //   .catch(function (error) {
    //     console.log("Error getting documents: ", error);
    //   });

  }

  onEdit(asu: Suceso) {
    this.service.formData = Object.assign({}, asu);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('sucesos/' + id).delete();
      this.toastr.warning('Deleted successfully', 'Suceso registrado');
    }
  }

}
