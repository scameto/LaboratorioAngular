export class Usuario {
    email: string;
    password: string;
    role: string;
    telefono: string;
  
    constructor(email: string, password: string, role: string, telefono: string) {
      this.email = email;
      this.password = password;
      this.role = role;
      this.telefono = telefono;
    }
}
