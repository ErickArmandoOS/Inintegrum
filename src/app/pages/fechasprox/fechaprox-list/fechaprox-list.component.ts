import { Component, OnInit } from '@angular/core';
import { Fecha } from '../../../shared/fechaprox.model';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FechaproxService } from '../../../shared/fechaprox.service';
import { Asunto } from '../../../models/asuntos';
import { Observable } from 'rxjs';
import { FborrarbuttonComponent } from '../buttons/fborrarbutton/fborrarbutton.component';
import { FeditbuttonComponent } from '../buttons/feditbutton/feditbutton.component';

@Component({
  selector: 'ngx-fechaprox-list',
  templateUrl: './fechaprox-list.component.html',
  styleUrls: ['./fechaprox-list.component.scss']
})
export class FechaproxListComponent implements OnInit {



  settings = {
    actions: false,
    columns: {
      control: {
        title: 'Control'
      },
      hora: {
        title: 'Hora',
      },
      fecha:{
        title: 'Fecha',
      },
      diligencia: {
        title: 'Diligencia',
      },
      concargoa: {
        title: 'Con Cargo A',
      },
      lugar: {
        title: 'Lugar',
      },
      
      borrar: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: FborrarbuttonComponent,
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
        renderComponent: FeditbuttonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            
          }); 
        },
      },
    }
  };

  list: Fecha[];


  constructor(private service: FechaproxService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getFechas().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Fecha;
      })
    });
  }


  onEdit(emp: Fecha) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('fechas/' + id).delete();
      this.toastr.warning('Deleted successfully','EMP. Register');
    }
  }

}
