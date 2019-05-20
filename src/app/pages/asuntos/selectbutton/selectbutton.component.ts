import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Asunto } from '../../../models/asuntos';
import { Observable } from 'rxjs';
import { TareaService } from '../../../shared/tarea.service';
import { ToastrService } from 'ngx-toastr';
import { AsuntosComponent } from '../asuntos.component';
import { AsuntosService } from '../../../shared/asuntos/asuntos.service';
import { AsuntoSelectComponent } from '../asunto/asunto-select/asunto-select.component';

@Component({
  selector: 'ngx-selectbutton',
  templateUrl: './selectbutton.component.html',
  styleUrls: ['./selectbutton.component.scss']
})
export class SelectbuttonComponent implements OnInit {

  renderValue: string;

  asuntosCollection: AngularFirestoreCollection<Asunto>;
  asuntos : Observable<Asunto[]>;

  @Input() value: string | number;
  @Input() rowData: any;

  list: Asunto[];

  @Output() save: EventEmitter<string> = new EventEmitter();

  

  constructor(private service: AsuntosService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) {
     
     }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

   onClick() {
    this.save.emit(this.rowData.control);
    //YA LO MANDA
    //console.log(this.rowData.control);
   }

 




  //  getOnce(control: string): any {
  //   let asunto: any = this.list.filter((asunto) => { return asunto.$control == control });
  //   console.log(asunto[control]);
  //   this.selectOne.emit(asunto[control]);
  //   alert("Si llega we");
  //   console.log(asunto[control]);
  //   return asunto[control];
  // }

  



}
