import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Asunto } from '../../../../models/asuntos';
import { Observable } from 'rxjs';
import { AsuntosService } from '../../../../shared/asuntos/asuntos.service';
import { ToastrService } from 'ngx-toastr';
import { FechaproxService } from '../../../../shared/fechaprox.service';

@Component({
  selector: 'ngx-fborrarbutton',
  templateUrl: './fborrarbutton.component.html',
  styleUrls: ['./fborrarbutton.component.scss']
})
export class FborrarbuttonComponent implements OnInit {
  renderValue: string;
  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos : Observable<Asunto[]>;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private service: FechaproxService,
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
       this.firestore.doc('fechas/' + this.rowData.id).delete();
       this.toastr.warning('Deleted successfully', 'Suceso Eliminado');
     }
   }


}
