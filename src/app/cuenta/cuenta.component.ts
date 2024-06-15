import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})
export class CuentaComponent {
  email = localStorage.getItem('emailU');
  telefono = localStorage.getItem('telefono');
  role = localStorage.getItem('role');


  constructor(private userService: UserService, private http:HttpClient) {}

  ngOnInit(): void {
    console.log(this.email);
    console.log(this.telefono);
    console.log(this.role);
  }
}
