import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: ProductModel[] = [];
  private productsKey = 'app_products';

  constructor() {
    // Retrieve products from sessionStorage when the service is initialized
    const productsJson = sessionStorage.getItem(this.productsKey);
    if (productsJson) {
      this.products = JSON.parse(productsJson);
    }
  }

  getProducts(): ProductModel[] {
    return this.products;
  }

  saveProduct(product: ProductModel) {
    const existingProductIndex = this.products.findIndex(p => p.productId === product.productId);
    if (existingProductIndex !== -1) {
      // If product exists, update it
      this.products[existingProductIndex] = product;
    } else {
      // If product doesn't exist, add it
      this.products.push(product);
    }
    sessionStorage.setItem(this.productsKey, JSON.stringify(this.products));

  }
}
