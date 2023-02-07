import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: string | null = localStorage.getItem(`name`);

  constructor(private router: Router) { 
console.log("navigate", this.name);    

  }

  ngOnInit(): void {
    console.log(name); 
  }

logOut() {
  localStorage.removeItem(`token`);
  localStorage.removeItem(`name`);
  this.router.navigate([`/login`]);
}

}
