import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../shared/tarea.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Tarea } from '../../shared/tarea.model';

@Component({
  selector: 'ngx-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
 

  constructor(){

  }
 ngOnInit(){

 }

}
