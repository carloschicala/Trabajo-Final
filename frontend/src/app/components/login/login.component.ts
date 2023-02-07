import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private _userService: UserService,
    private router: Router
 ) { }

  ngOnInit(): void {
  }
  login() {

    // validamos que el usuario ingrese valores
    if(this.username == '' || this.password == '') {
      alert('Todos los campos son obligatorios')
      return;
    }
    
    // creamos el objeto o el body
    const user: User = {
      username: this.username,
      password: this.password
    }
    
    this.loading = true;
    this._userService.login(user).subscribe(token => {
      this.loading = false;
      alert(('el usuario ') + this.username + (' fue loggineado con exito'));
      
      localStorage.setItem('token', token);
      localStorage.setItem(`name`,this.username);
      this.router.navigate(['/dashboard']);
      
      console.log(token);
    }, (event: HttpErrorResponse) => {
      this.loading = false
      if(event.error.msg) {
        console.log(event.error.msg);
        alert(event.error.msg + ("  ***  Error ***") )
      } else {
        alert ('Upps ocurrio un error no tipificado comuniquese con el Administrador');
      }
      
      
    });


  }

}
