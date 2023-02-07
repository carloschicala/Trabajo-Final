import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Productadd } from 'src/app/interfaces/productadd';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listProduct: Product[] = [];
  
////////////////
  name: string | null = localStorage.getItem(`name`);
  description: any;
  loading: boolean = false;
///////////////////////


  constructor(private _productService: ProductService) { }

//////////////

//////////
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
      console.log(data);
    })
  }
/////////////////
sendProduct() {
  const addProduct: Productadd = {
    name :  localStorage.getItem(`name`),
    description: this.description
  }
console.log("antes", this.name);
  console.log("aca", this.name, this.description, addProduct);

    // validamos que el usuario ingrese valores
    if( this.description == '') {
      alert('Todos los campos son obligatorios')
      return;
    }


  this._productService.addProduct(addProduct).subscribe(data => {
    this.loading = true;
    //alert(('el comentario ') + this.name + (' fue registrado con exito'));
    ////console.log(`el usuario ${this.username} fue registrado con exito`);
    //this.router.navigate(['/login']);
    location.reload();
    this.loading = false;
  }, (event: HttpErrorResponse) => {
    this.loading = false;
    if(event.error.msg) {
      console.log(event.error.msg);
      alert(event.error.msg + ("  ***  Error ***") )
    } else {
      alert ('Upps ocurrio un error no tipificado comuniquese con el Administrador');
    }
    
    
  });




}

////////////////////
}
