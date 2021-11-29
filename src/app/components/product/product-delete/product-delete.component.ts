import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    id: null,
    name: '',
    price: null
  }
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.productService.readyById(this.route.snapshot.paramMap.get('id')).subscribe( (resp) => {
      this.product = resp;
    })
  }

  cancel(): void{
    this.router.navigate(['products']);
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage('Produto deletado com sucesso');
      this.router.navigate(['products'])
    })
  }

}
