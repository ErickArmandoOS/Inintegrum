import { Component, OnInit, Directive, Input, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { Asunto } from '../../../shared/asuntos/asuntos.model';
import { AsuntosService } from '../../../shared/asuntos/asuntos.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { SelectbuttonComponent } from '../selectbutton/selectbutton.component';
import { AborrarbuttonComponent } from '../aborrarbutton/aborrarbutton.component';
import { AeditbuttonComponent } from '../aeditbutton/aeditbutton.component';
import { getCheckNoChangesMode } from '@angular/core/src/render3/state';





@Component({
  selector: 'ngx-asunto-list',
  templateUrl: './asunto-list.component.html',
  styleUrls: ['./asunto-list.component.scss']
})

export class AsuntoListComponent implements OnInit {

  asuS: string;

  settings = {
    actions: false,
    columns: {
      go: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: SelectbuttonComponent,
        
      },
      control: {
        title: 'Control'
      },
      expediente: {
        title: 'Expediente',
      },
      empresa: {
        title: 'Empresa',
      },
      ciudad: {
        title: 'Ciudad'
      },
      actor: {
        title: 'Actor'
      },
      junta: {
        title: 'Autoridad',
      },
      ubicacion: {
        title: 'Ubicaciones',
      },
      estatus: {
        title: 'Estatus',
      },
      accion: {
        title: 'Acción',
      },
      borrar: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: AborrarbuttonComponent,
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
        renderComponent: AeditbuttonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {

          });
        },
      }
    }
  };

  source: LocalDataSource

  list: Asunto[];

  @Output() selectOne: EventEmitter<any> = new EventEmitter();

  @Output() numeroA: EventEmitter<any> = new EventEmitter();

  control: string;

  constructor(public service: AsuntosService,
    private firestore: AngularFirestore,
    public toastr: ToastrService) {

    this.source = new LocalDataSource(this.list);

  }

  ngOnInit() {
    this.service.getAsuntos().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Asunto;
      })
    });

  }

  getOnce(control: string): any {
    let asunto: any = this.list.filter((asunto) => { return asunto.control == control });
    console.log(asunto[control]);
    this.selectOne.emit(asunto[control]);
    alert("Si llega we");
    console.log(asunto[control]);
    return asunto[control];
  }

  onEdit(asu: Asunto) {
    this.service.formData = Object.assign({}, asu);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('asuntos/' + id).delete();
      this.toastr.warning('Deleted successfully', 'EMP. Register');
    }
  }

}
