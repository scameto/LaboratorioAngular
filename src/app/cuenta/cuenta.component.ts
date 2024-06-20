import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usuario = this.userService.getUsuarioAutenticado();
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  logout(): void {
    this.userService.logout();
  }
}
