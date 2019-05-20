import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../../../../shared/employee.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Asunto } from '../../../../models/asuntos';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-uborrarbutton',
  templateUrl: './uborrarbutton.component.html',
  styleUrls: ['./uborrarbutton.component.scss']
})
export class UborrarbuttonComponent implements OnInit {

  renderValue: string;
  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos : Observable<Asunto[]>;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) {
     
     }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

   onClick() {
     this.save.emit(this.rowData.id);
     console.log(this.rowData.id);
     //this.toastr.warning('Deleted successfully', 'Suceso Eliminado');
      if (confirm("Are you sure to delete this record?")) {
       this.firestore.doc('usuarios/' + this.rowData.id).delete();
       this.toastr.warning('Deleted successfully', 'Suceso Eliminado');
     }
   }


}
