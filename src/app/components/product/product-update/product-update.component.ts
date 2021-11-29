import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.productService.readyById(this.route.snapshot.paramMap.get('id')).subscribe((resp) => {
      this.product = resp;
    });
  }

  public updateProduct(): void{
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso");
      this.router.navigate(['products']);
    })
  }

  public cancel(): void{
    this.router.navigate(['products']);
  }
}
