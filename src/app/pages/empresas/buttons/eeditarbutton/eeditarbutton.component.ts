import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmpresaService } from '../../../../shared/empresa.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Asunto } from '../../../../models/asuntos';
import { Observable } from 'rxjs';
import { Employee } from '../../../../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-eeditarbutton',
  templateUrl: './eeditarbutton.component.html',
  styleUrls: ['./eeditarbutton.component.scss']
})
export class EeditarbuttonComponent implements OnInit {

  renderValue: string;
  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos: Observable<Asunto[]>;

  usuariosCollection : AngularFirestoreCollection<Employee>;
  usuarios: Observable<Employee[]>

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private service: EmpresaService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
    // this.asuntosCollection = this.firestore.collection('asuntos')
    // this.asuntos = this.asuntosCollection.valueChanges()

    // this.usuariosCollection = this.firestore.collection('usuarios')
    // this.usuarios = this.usuariosCollection.valueChanges()
  }

  onClick() {
    this.save.emit(this.rowData.id);
    
    this.service.formData = Object.assign({}, this.rowData);
  }

}
