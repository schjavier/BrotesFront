export class CreateClientDto {

  nombre:string;
  direccion:string;
  telefono:string;

  constructor(name:string, adress:string, phone:string) {
    this.nombre = name;
    this.direccion = adress;
    this.telefono = phone;
  }


}
