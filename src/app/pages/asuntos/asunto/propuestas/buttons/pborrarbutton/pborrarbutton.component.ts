import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropuestaService } from '../../../../../../shared/propuestas/propuesta.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Asunto } from '../../../../../../models/asuntos';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-pborrarbutton',
  templateUrl: './pborrarbutton.component.html',
  styleUrls: ['./pborrarbutton.component.scss']
})
export class PborrarbuttonComponent implements OnInit {

  renderValue: string;
  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos : Observable<Asunto[]>;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private service: PropuestaService,
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
       this.firestore.doc('propuestas/' + this.rowData.id).delete();
       this.toastr.warning('Deleted successfully', 'Suceso Eliminado');
     }
   }

}
