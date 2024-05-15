import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/_services/products.service';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productForm!: FormGroup;  
  products: ProductModel[] = [];  // to store the list of products

  constructor(private fb: FormBuilder,private productService: ProductsService) {}

  ngOnInit() {
    // Initialize the form with validation rules
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.maxLength(50)]], // Required field = yes // max length = 50
      productId: ['', [Validators.required, Validators.pattern(/^\d{1,13}$/)]], // Required field = yes // max length 1-13 digits
      productManager: ['', [Validators.maxLength(30)]], // required field = no //  max length = 30
      salesStartDate: ['', [Validators.required]] // Required field = yes
    });
    this.products = this.productService.getProducts(); 

  }
  
  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.productService.saveProduct(formData);
      // Log form data to the console (for test if error)
      console.log('Form Data:', formData);
      this.onClear();
    // Scroll to the table bottom for display purposes
    // delaying the execution to allow time for the table to be fully rendered before scrolling
      setTimeout(() => {
        this.goToBottom()
      }, 100); 
    } else {
      console.error('Form is invalid');
    }
  }

  onClear() {
    this.productForm.reset();
  }

  goToBottom(){
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  editProduct(product: ProductModel) {
    // Populate the form with the data of the selected product for editing
    this.productForm.patchValue(product);
  }
}