export class Usuario {
    id:number;
    email: string;
    password: string;
    role: string;
    telefono: string;
    enabled:boolean
  
    constructor(id:number, email: string, password: string, role: string, telefono: string) {
      this.email = email;
      this.password = password;
      this.role = role;
      this.telefono = telefono;
      this.enabled = false;
      this.id = id;
    }
}
