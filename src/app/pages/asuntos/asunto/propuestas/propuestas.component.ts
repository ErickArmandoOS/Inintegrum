import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { PropuestaService } from '../../../../shared/propuestas/propuesta.service';
import { Observable } from 'rxjs';
import { Asunto } from '../../../../models/asuntos';
import { Employee } from '../../../../shared/employee.model';


@Component({
  selector: 'ngx-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.scss']
})
export class PropuestasComponent implements OnInit {

  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos: Observable<Asunto[]>;
  usuariosCollection: AngularFirestoreCollection<Employee>;
  usuarios: Observable<Employee[]>

  constructor(private service: PropuestaService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) {
    this.asuntosCollection = this.firestore.collection('asuntos')
    this.asuntos = this.asuntosCollection.valueChanges()

    this.usuariosCollection = this.firestore.collection('usuarios')
    this.usuarios = this.usuariosCollection.valueChanges()
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      control: '',
      fecha: '',
      cantidad: '',
      autoriza: '',
      abogado: '',
      medio: '',
      comempresa: '',
      comabogado: '',
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('propuestas').add(data);
    else
      this.firestore.doc('propuestas/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'Propuesta creada');
  }


  obtControlNo() {
    this.resetForm();
  }
}
