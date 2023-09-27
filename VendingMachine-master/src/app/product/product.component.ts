// product-section.component.ts

import { Component, Input } from '@angular/core';
import { Product } from '../vending-machine.service';
@Component({
  selector: 'app-product-section',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() products: Product[] = [];
  @Input() selectedProduct: string = '';
  @Input() cart: Map<string, number> = new Map();

  constructor() { }

  addToCart(productId: string, quantity: number) {
    if (this.cart.has(productId)) {
      const currentQuantity = this.cart.get(productId) || 0; // Use 0 if the quantity is undefined
      this.cart.set(productId, currentQuantity + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
  }
}

