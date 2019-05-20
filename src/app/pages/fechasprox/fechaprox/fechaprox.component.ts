import { Component, OnInit, ViewChild } from '@angular/core';
import { FechaproxService } from '../../../shared/fechaprox.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Asunto } from '../../../models/asuntos';
import { Observable, Subject, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

const states = ['ACDEOyAP', 'ACDyE', 'ACUERDO CON REQUERIMIENTO DE TÉRMINO', 
'ACUERDO DE CALIFICACIÓN DE PRUEBAS', 'ACUERDO SEÑALA FECHA PARA CONFESIONAL ACTORA', 
'ACUERDO SEÑALA FECHA PARA CONFESIONAL DEMANDADA', 'ACUERDO SEÑALA FECHA PARA COTEJO', 
'ACUERDO SEÑALA FECHA PARA INSPECCIÓN OCULAR', 'ACUERDO SEÑALA FECHA PARA LA PERICIAL ACTORA', 
'ACUERDO SEÑALA FECHA PARA LA PERICIAL DEMANDADA', 'ACUERDO SEÑALA FECHA PARA LA REINSTALACIÓN', 
'ACUERDO SEÑALA FECHA PARA LA REINSTALACIÓN', 'ACUERDO SEÑALA FECHA PARA PERICIALES PARTES', 'ACUERDO SEÑALA FECHA PARA TESTIMONIAL ACTORA',
'ACUERDO SEÑALA FECHA PARA TESTIMONIAL ACTORA DEMANDADA', 'ACUERDO SEÑALA FECHA PARA TOMA DE ESCRITURA', 'ACUERDO SEÑALA FECHA PERICIAL TERCERO EN DISCORDIA', 
'ALEGATOS', 'AMPARO', 'AUDIENCIA CONSTITUCIONAL', 'CALIFICACIÓN DE PRUEBAS', 'CIERRE DE INSTRUCCIÓN', 'CITA CONCILIATORIA', 'COLEGIADO ORDENA A LA JUNTA EMITA NUEVO LAUDO', 
'COLEGIADO ORDENA SE REPONGA EL PROCEDIMIENTO', 'CONFESIONAL ACTORA', 'CONFESIONAL DEMANDADA', 'CONFESIONALES HECHOS PROPIOS', 'CONFESIONALES PARTES',
'CONVENIO A PLAZO', 'CONVENIO SUJETO A RATIFICACIÓN', 'COTEJO', 'COTIZACIÓN PERITAJE', 'CUMPLIMIENTO DE CONVENIO', 'DESAHOGO DE PRUEBAS', 'DESAHOGO PRUEBA MEDIO APORTADO POR LA CIENCIA', 'DICTÁMEN', 'DIFERIDA POR PLATICAS', 'EMBARGO', 'INCIDENTAL ACUMULACIÓN', 'INCIDENTAL DE COMPETENCIA', 'INCIDENTAL DE EXCUSAS', 'INCIDENTAL DE NULIDAD', 'INCIDENTAL DE PERSONALIDAD', 'INCIDENTE DE LIQUIDACIÓN', 'INFORME IMSS', 'INFORME INFONAVIT', 'INFORME INSTITUCIÓN BANCARIA', 'INFORME OTRO', 'INFORME TELCEL', 'INSPECCIÓN OCULAR ACTORA', 'INSPECCIÓN OCULAR DEMANDADA', 'INSPECCIONES OCULARES', 'LA JUNTA REGULARIZA PROCEDIMIENTO Y SEÑALA FECHA', 'LA JUNTA SE DECLARA INCOMPETENTE', 'LAUDO', 'NOTIFICACIÓN AUDIENCIA INCIDENTAL', 'OFRECIMIENTO Y ADMISIÓN DE PRUEBAS', 'PARTE ACTORA MODIFICÓ Y/O AMPLIÓ DEMANDA', 'PARTE ACTORA PROMUEVE AMPARO DIRECTO', 'PARTE ACTORA PROMUEVE AMPARO INDIRECTO', 'PARTE DEMANDADA PROMUEVE AMPARO DIRECTO', 'PARTE DEMANDADA PROMUEVE AMPARO INDIRECTO', 'PERICIAL PSICOLÓGICA', 'PERICIALES PARTES ', 'PERITO ACTOR ACEPTA CARGO', 'PERITO ACTOR RINDE DICTÁMEN', 'PERITO EMPRESA ACEPTA CARGO', 'PERITO EMPRESA RINDE DICTÁMEN', 'PERITO SOLICITA TÉRMINO PARA RENDIR', 'PERITO TERCERO ACEPTA CARGO', 'PERITO TERCERO RINDE DICTÁMEN', 'PROMOCIÓN CUMPLE REQUERIMIENTO', 'RATIFICACIÓN EN CONTENIDO Y FIRMA A CARGO DEL ACTOR', 'RATIFICACIÓN EN CONTENIDO Y FIRMA OTRO', 'REINSTALACIÓN', 'REMATE', 'RÉPLICA Y CONTRARÉPLICA', 'RESERVA PARA CALIFICACIÓN DE PRUEBAS', 'SE ADMITE AMPARO PARTE ACTORA', 'SE ADMITE AMPARO PARTE DEMANDADA', 'SE FIJA NUEVA FECHA POR FALTA DE NOTIFICACIÓN', 'SE TURNA PARA DICTÁMEN', 'SUSPENSIÓN DE AUDIENCIA POR DÍAS FESTIVOS', 'TÉRMINO PARA ACEPTAR OFERTA DE TRABAJO', 'TÉRMINO PARA ALEGATOS', 'TÉRMINO PARA CERTIFICACIÓN', 'TÉRMINO PARA EXHIBIR IDENTIFICACIÓN', 'TÉRMINO PARA EXHIBIR JUSTIFICANTE MÉDICO', 'TÉRMINO PARA OBJETAR', 'TESTIMONIAL ACTORA', 'TESTIMONIAL DEMANDADA', 'TESTIMONIAL PARTES', 'TESTIMONIAL SINGULAR', 'TOMA CUERPO DE ESCRITURA',];


@Component({
  selector: 'ngx-fechaprox',
  templateUrl: './fechaprox.component.html',
  styleUrls: ['./fechaprox.component.scss']
})
export class FechaproxComponent implements OnInit {

  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos : Observable<Asunto[]>;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }


  constructor(private service: FechaproxService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { 
      this.asuntosCollection = this.firestore.collection('asuntos')
      this.asuntos = this.asuntosCollection.valueChanges() 

    }

  ngOnInit() {
    this.resetForm();
 
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      hora: '',
      fecha: '',
      control:'',
      diligencia: '',
      concargoa: '',
      lugar: '',
    }
  }
  obtControlNo(){
   
    this.resetForm()
    // this.asuntosCollection = this.firestore.collection('asuntos')
    // this.asuntos = this.asuntosCollection.valueChanges() 
  }
  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('fechas').add(data);
    else
      this.firestore.doc('fechas/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'EMP. Register');
  }

}
