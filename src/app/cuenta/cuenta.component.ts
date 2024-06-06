import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../services/cuenta.service';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})
export class CuentaComponent {
  token: any = '';
  usuario: Usuario | null = null; 

  constructor(private cuentaService: CuentaService, private http:HttpClient) {}

  ngOnInit(){
    //this.loadUsuario();
  }

  /* loadUsuario(){
    this.cuentaService.getUsuario().subscribe((data:any) => {
      this.usuario = data;
      console.log(data);
    },
    (error) => {
      console.error('Error al traer al usuario',error)
    })
  } */
}
