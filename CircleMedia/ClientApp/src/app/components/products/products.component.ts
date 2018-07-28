import { ProductService } from './../../services/product.service';
import { ToastyService } from 'ng2-toasty';
import { IProduct } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  product: IProduct = {
    id: 0,
    name: "",
    turnover: 0,
    price: 0
  };
  productForm: FormGroup;

  constructor(
    private toastyService: ToastyService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder, 
    private productService: ProductService) {
      this.route.params.subscribe(p => this.product.id = +p.id);
      this.createProductForm();
    }

    ngOnInit() {
      if (this.product.id) {
        this.productService.getProduct(this.product.id)
          .subscribe(product => {
            this.setProductForm(product);
          },
          error => {
            console.log(error);
            if (error.status == 404) {
              this.router.navigate(["/not-found"]);
            }
          });
      }
    }
    
    setProductForm(p: IProduct) {
      this.name.setValue(p.name);
      this.price.setValue(p.price);
      this.turnover.setValue(p.turnover);
    }

    createProductForm() {
      this.productForm = this.fb.group({
        name: ["", [Validators.required,Validators.maxLength(255)]],
        price: ["", [Validators.required]],
        turnover: ["", [Validators.required]]
      });
    }

    submit() {
      if (this.productForm.valid) {
        var result$;
  
        if (this.product.id) {
          var productId = this.product.id;
          this.product = this.productForm.value;
          this.product.id = productId;
          result$ = this.productService.update(this.product);
        } else {
          this.product = this.productForm.value;
          result$ = this.productService.create(this.product);
        }
  
        result$.subscribe(product => {
          this.toastyService.success({
            title: "Success",
            msg: "Project data successfully saved.",
            theme: "material",
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(["/products"]);
        }, error => {
          this.toastyService.error({
            title: "Error",
            msg: "An unexpected error occured. Please try again later.",
            theme: "material",
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(["/products"]);
        }
      );
      }
      
    }
  
    get name(): FormControl {
      return this.productForm.get("name") as FormControl;
    }
    get price(): FormControl {
      return this.productForm.get("price") as FormControl;
    }
    get turnover(): FormControl {
      return this.productForm.get("turnover") as FormControl;
    }
  }
