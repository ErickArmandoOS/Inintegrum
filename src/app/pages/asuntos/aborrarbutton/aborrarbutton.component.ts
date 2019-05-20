import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Asunto } from '../../../models/asuntos';
import { Observable } from 'rxjs';
import { TareaService } from '../../../shared/tarea.service';
import { ToastrService } from 'ngx-toastr';
import { AsuntosService } from '../../../shared/asuntos/asuntos.service';

@Component({
  selector: 'ngx-aborrarbutton',
  templateUrl: './aborrarbutton.component.html',
  styleUrls: ['./aborrarbutton.component.scss']
})
export class AborrarbuttonComponent implements OnInit {
  renderValue: string;
  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos : Observable<Asunto[]>;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private service: AsuntosService,
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
       this.firestore.doc('asuntos/' + this.rowData.id).delete();
       this.toastr.warning('Deleted successfully', 'Suceso Eliminado');
     }
   }

}
