// vending-machine.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VendingMachineService {
  
  private products: Product[] = [
    { id: '1', name: 'Dairy Milk', price: 100, quantity: 2 },
    { id: '2', name: 'Milk Bikis', price: 20, quantity: 2 },
    { id: '3', name: 'Galaxy Flutes', price: 80, quantity: 6 },
    { id: '4', name: 'Almarai Juice', price: 300, quantity:4 }

  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  addToCart(productId: string, quantity: number) {
    throw new Error('Method not implemented.');
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
