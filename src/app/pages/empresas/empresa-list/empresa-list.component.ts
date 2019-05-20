import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../shared/empresa.model';
import { EmpresaService } from '../../../shared/empresa.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { EeditarbuttonComponent } from '../buttons/eeditarbutton/eeditarbutton.component';
import { EborrarbuttonComponent } from '../buttons/eborrarbutton/eborrarbutton.component';
import { EshotbuttonComponent } from '../buttons/eshotbutton/eshotbutton.component';

@Component({
  selector: 'ngx-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      
      nombre: {
        title: 'Nombre',
      },
      contrasena: {
        title: 'Contraseña',
      },

       show: {
         hideHeader: true,
         hideSubHeader: true,
         filter: false,
         type: 'custom',
         renderComponent: EshotbuttonComponent,
         onComponentInitFunction(instance) {
           instance.save.subscribe(row => {
            
           }); 
         },
       },
      
      edita: {
        hideHeader: true,
        hideSubHeader: true,
        filter: false,
        type: 'custom',
        renderComponent: EeditarbuttonComponent,
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
        renderComponent: EborrarbuttonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            
          }); 
        },
      }  
    }
   
  };

  list: Empresa[];

  constructor(private service: EmpresaService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getEmpresas().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Empresa;
      })
    });
  }

  onEdit(emp: Empresa) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('empresas/' + id).delete();
      this.toastr.warning('Deleted successfully','EMP. Register');
    }
  }



}
