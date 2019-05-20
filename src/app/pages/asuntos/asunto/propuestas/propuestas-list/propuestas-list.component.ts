import { Component, OnInit } from '@angular/core';
import { PropuestaService } from '../../../../../shared/propuestas/propuesta.service';
import { Propuesta } from '../../../../../shared/propuestas/propuesta.modal';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { PeditarbuttonComponent } from '../buttons/peditarbutton/peditarbutton.component';
import { PborrarbuttonComponent } from '../buttons/pborrarbutton/pborrarbutton.component';

@Component({
  selector: 'ngx-propuestas-list',
  templateUrl: './propuestas-list.component.html',
  styleUrls: ['./propuestas-list.component.scss']
})
export class PropuestasListComponent implements OnInit {


  settings = {
    actions: false,
    columns: {

     
      control: {
        title: 'Control'
      },
      fecha: {
        title: 'Fecha',
      },
      cantidad: {
        title: 'Cantidad',
      },
      autoriza: {
        title: 'Autoriza',
      },
      abogado: {
        title: 'Abogado',
      },
      medio: {
        title: 'Medio',
      },
      comempresa: {
        title: 'Comnetarios Empresa',
      },
      comabogado: {
        title: 'Comentarios Abogado',
      },
      delete: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: PborrarbuttonComponent,
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
        renderComponent: PeditarbuttonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            
          }); 
        },
        
      }

      
    }
  };

  list: Propuesta[];
  

  constructor(public service: PropuestaService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) {

  }


  

  ngOnInit() {
    this.service.getPropuestas().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Propuesta;
      })
    });

  }


  onEdit(asu: Propuesta) {
    this.service.formData = Object.assign({}, asu);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('propuestas/' + id).delete();
      this.toastr.warning('Deleted successfully', 'Propuesta Registrada');
    }
  }


}
