import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropuestaService } from '../../../../../../shared/propuestas/propuesta.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Asunto } from '../../../../../../models/asuntos';
import { Observable } from 'rxjs';
import { Employee } from '../../../../../../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-peditarbutton',
  templateUrl: './peditarbutton.component.html',
  styleUrls: ['./peditarbutton.component.scss']
})
export class PeditarbuttonComponent implements OnInit {
  renderValue: string;
  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos: Observable<Asunto[]>;

  usuariosCollection : AngularFirestoreCollection<Employee>;
  usuarios: Observable<Employee[]>

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private service: PropuestaService,
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
