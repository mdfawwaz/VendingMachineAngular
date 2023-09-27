import { Component, OnInit } from '@angular/core';
import { VendingMachineService } from '../vending-machine.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})

export class VendingMachineComponent implements OnInit {
  selectedProductId: string = '';
  selectedProduct: Product | undefined;
  cart: Map<string, number> = new Map();
  products: Product[] = [];
  quantity: number | undefined;

  constructor(public vendingMachineService: VendingMachineService) { }
  totalBill: number = 0;

  ngOnInit() {
    this.products = this.vendingMachineService.getProducts();
  }


onProductSelected(productId: string) {
  const selectedProduct = this.vendingMachineService.getProductById(productId);

  if (selectedProduct) {
    if (selectedProduct.quantity > 0) {
      selectedProduct.quantity--;

      this.selectedProduct = selectedProduct;
    } else {
      console.log('Product is out of stock.');
    }
  } else {
    console.log('Invalid product ID');
  }
}


  addToCart(productId: string, quantity: number) {
    const product = this.vendingMachineService.getProductById(productId);
    if (product) {
      if (product.quantity >= quantity) {
        product.quantity -= quantity;

        if (this.selectedProduct && this.selectedProduct.id === productId) {
          this.selectedProduct.quantity = 0;
        }

        if (this.cart.has(productId)) {
          this.cart.set(productId, this.cart.get(productId)! + quantity);
        } else {
          this.cart.set(productId, quantity);
        }
      } else {
        console.log('Insufficient quantity in stock.');
      }
    } else {
      console.log('Invalid product ID');
    }
  }

  increaseQuantity(product: Product) {
    if (product) {
      product.quantity++;
    }
  }

  decreaseQuantity(product: Product) {
    if (product && product.quantity > 0) {
      product.quantity--;
    }
  }

  closeSection() {
    this.selectedProductId = '';
  }

  calculateTotalBill() {
    if (this.selectedProduct) {
      this.totalBill += this.selectedProduct.price * this.selectedProduct.quantity;
      window.alert(`Total Bill Amount: ₹${this.totalBill.toFixed(2)}`);

    } else {
      this.totalBill = 0;
    }
  }
  

}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
