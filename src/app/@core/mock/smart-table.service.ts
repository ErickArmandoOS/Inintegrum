import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    nocontrol: 32434234,
    expediente: 'q34u33000',
    empresa: 'Colmena',
    ciudad: 'Chihuahua',
    actor: 'Erick Ortiz',
    junta: 'LOCAL 01',
    ubicaciones: 'Chihuahua',
    estatus: 'Laudo', 
  }
];

  getData() {
    return this.data;
  }
}

