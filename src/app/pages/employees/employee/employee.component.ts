import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      nombre: '',
      apaterno: '',
      amaterno: '',
      correo: '',
      rol: '',
      contrasena: ''
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('usuarios').add(data);
    else
      this.firestore.doc('usuarios/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'EMP. Register');
  }

  onClick(){
    this.resetForm();
  }

}
