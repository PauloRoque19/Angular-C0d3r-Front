import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '', 
    price: null}

  constructor(
    private serviceProduct: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  public createProduct(): void {
    this.serviceProduct.create(this.product).subscribe(() =>{
      this.serviceProduct.showMessage("Produto criado!")
      this.router.navigate(['/products']);
    });
  }

  public cancel(): void {
    this.router.navigate(['/products']);
  }
}
