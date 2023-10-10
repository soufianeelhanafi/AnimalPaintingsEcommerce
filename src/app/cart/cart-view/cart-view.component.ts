import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrix: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe((data) => {
      this.cartItems = data;
    });
  }

  getTotalprice(): number {
    let total = 0;
    for (let prod of this.cartItems) {
      total += prod.price;
    }
    return total;
  }

  clearCart(): void {
    this.cartService.viderLaCart().subscribe();
  }

  checkout(): void {
    this.cartService.checkout(this.cartItems).subscribe();
  }
}
