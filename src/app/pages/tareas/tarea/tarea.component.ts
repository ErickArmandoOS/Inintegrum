import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TareaService } from '../../../shared/tarea.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { isoStringToDate } from '@angular/common/src/i18n/format_date';
import { Tarea } from '../../../shared/tarea.model';
import { Observable } from 'rxjs';
import { Asunto } from '../../../shared/asuntos/asuntos.model';
import { Employee } from '../../../shared/employee.model';


@Component({
  selector: 'ngx-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {

  list: Tarea[];
  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos: Observable<Asunto[]>;

  usuariosCollection: AngularFirestoreCollection<Employee>;
  usuarios: Observable<Employee[]>

  constructor(private service: TareaService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) {

    this.asuntosCollection = this.firestore.collection('asuntos')
    this.asuntos = this.asuntosCollection.valueChanges()

    this.usuariosCollection = this.firestore.collection('usuarios')
    this.usuarios = this.usuariosCollection.valueChanges()
  }

  ngOnInit() {
    this.resetForm();


    // this.firestore.collection('asuntos')
    //  .valueChanges()
    //  .subscribe(
    //    val => console.log(val)
    //  );
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      control: '',
      fechaasi: '',
      fechalim: '',
      tarea: '',
      responsable: '',
    }
  }

  obtControlNo() {
    this.resetForm()
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('tareas').add(data);
    else
      this.firestore.doc('tareas/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'EMP. Register');
  }
}
