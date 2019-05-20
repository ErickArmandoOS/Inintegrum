import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../shared/employee.service';
import { Employee } from '../../../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { LocalDataSource } from 'ng2-smart-table';
import { UeditarbuttonComponent } from '../buttons/ueditarbutton/ueditarbutton.component';
import { UborrarbuttonComponent } from '../buttons/uborrarbutton/uborrarbutton.component';




@Component({
  selector: 'ngx-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  settings = {
    pager:{perPage:50},
    actions: false,
    columns: {
      nombre: {
        title: 'Nombre',
      },
      apaterno: {
        title: 'Apellido Paterno',
      },
      amaterno: {
        title: 'Apellido Materno',
      },
      correo: {
        title: 'Correo',
      },
      rol: {
        title: 'Rol',
      },
      contrasena: {
        title: 'Contraseña',
      },
      editar: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: UeditarbuttonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
           
          }); 
        },
      },
      borrar: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: UborrarbuttonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
           
          }); 
        },
      },
      // opciones: {
      //   title: 'Opciones',
      //   type: 'html',
      //   filter: false,
      //   valuePrepareFunction:()=>{
      //     return ` 
      //     <a class="btn text-danger" (click)="onDelete(asu.id)"><i class="fa fa-trash"></i></a>
      //     `
      //     },
      //   }
    }


  }



  list: Employee[];

  source: LocalDataSource

  constructor(private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) {
    this.source = new LocalDataSource(this.list);
  }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      })
    });

  }


  onEdit(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('usuarios/' + id).delete();
      this.toastr.warning('Deleted successfully', 'EMP. Register');
    }
  }

  //---------------------------------------------------
  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      const index = event.source.data.indexOf(event.data);
      event.source.data.splice(index, 1);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
