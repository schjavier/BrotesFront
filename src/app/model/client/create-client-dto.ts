export class CreateClientDto {

  nombre:string;
  direccion:string;

  constructor(name:string, adress:string) {
    this.nombre = name;
    this.direccion = adress;
  }


}
