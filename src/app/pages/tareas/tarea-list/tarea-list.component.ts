import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../../shared/tarea.model';
import { TareaService } from '../../../shared/tarea.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { LocalDataSource } from 'ng2-smart-table';

import { BorrarbuttonComponent } from '../buttons/borrarbutton/borrarbutton.component';
import { TeditarbuttonComponent } from '../buttons/teditarbutton/teditarbutton.component';


@Component({
  selector: 'ngx-tarea-list',
  templateUrl: './tarea-list.component.html',
  styleUrls: ['./tarea-list.component.scss']
})
export class TareaListComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      control: {
        title: 'Control',
      },
      fechaasig: {
        title: 'Fecha Asignada',
      },
      fechalim: {
        title: 'Fecha Límite',
      },
      tarea: {
        title: 'Descripción',
      },
      responsable: {
        title: 'Resposable',
      },
      delete: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: BorrarbuttonComponent,
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
        renderComponent: TeditarbuttonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            
          }); 
        },
      }
        
      // opciones: {
      //   title: 'Opciones',
      //   type: 'html',
      //   filter: false,
      //   valuePrepareFunction:(cell,row)=>{
      //     return `<a class="btn text-danger"><i class="fa fa-trash" ></i></a>`
      //   },
      //   },   
    }
    
  };


  list: Tarea[];
  source: LocalDataSource;
  
  constructor(private service: TareaService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) {
      this.source = new LocalDataSource(this.list);

      
     }

    

  ngOnInit() {
    this.service.getTareas().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Tarea;
      })
    });
  }

}
