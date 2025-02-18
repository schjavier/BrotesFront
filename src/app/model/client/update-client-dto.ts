export class UpdateClientDto{
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;

  constructor(id: string, nombre: string, direccion: string, telefono: string) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;

  }

}
