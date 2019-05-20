import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../shared/empresa.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  constructor(private service: EmpresaService,
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
      contrasena: '',
      enlace1: '',
      telefono1: '',
      correo1: '',
      celular1: '',
      domicilio1: '',
      enlace2: '',
      telefono2: '',
      correo2: '',
      celular2: '',
      domicilio2: '',
      enlace3: '',
      telefono3: '',
      correo3: '',
      celular3: '',
      domicilio3: ''
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('empresas').add(data);
    else
      this.firestore.doc('empresas/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'EMP. Register');
  }

  onClick(){
    this.resetForm()
  }

}


