import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  addUser() {
// validamos que el usuario ingrese valores
if(this.username == '' || this.password == '' || this.confirmPassword == '') {
  alert('Todos los campos son obligatorios')
  return;
}
// validamos que las passwords sean iguales
if(this.password != this.confirmPassword) {
  alert(' ** LAS PASSWORDS INGRESADAS SON DISTINTAS **')
  return;
}
// creamos el objeto o el body
const user: User = {
  username: this.username,
  password: this.password
}

this.loading = true;
this._userService.signIn(user).subscribe(data => {
  this.loading = false;
  alert(('el usuario ') + this.username + (' fue registrado con exito'));
  //console.log(`el usuario ${this.username} fue registrado con exito`);
  this.router.navigate(['/login']);
}, (event: HttpErrorResponse) => {
  this.loading = false
  if(event.error.msg) {
    console.log(event.error.msg);
    alert(event.error.msg + ("  ***  Error ***") )
  } else {
    alert ('Upps ocurrio un error no tipificado comuniquese con el Administrador');
  }
  
  
});

console.log(user);
  }
}
