export class UpdateClientDto{
  id: string;
  nombre: string;
  direccion: string;

  constructor(id: string, nombre: string, direccion: string) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
  }

}
