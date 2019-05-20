
export class Asunto {
    id?: string;
    control: string;
    expediente: string;
    empresa: any;
    ciudad: string;
    actor: string;
    junta: string;
    ubicacion: string;  
    estatus: string;
    accion: string;
}


export interface AsuntoId extends Asunto { id: string; }



