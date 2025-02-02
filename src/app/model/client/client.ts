export class Client {

  id:number;
  nombre:string;
  direccion:string;
  telefono:string;
  activo:boolean;

  constructor(id:number, name: string, adress: string, phone:string, active:boolean) {
    this.id = id;
    this.nombre = name;
    this.direccion = adress;
    this.telefono = phone;
    this.activo = active;


  }

}
