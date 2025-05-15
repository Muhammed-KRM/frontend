import { Component, OnInit, OnDestroy, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/public/auth.service';
import { UserManagementService } from '../../../core/services/api/user-management.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  private cartSubscription!: Subscription;
  navbarOpen = false;
  isLoggedIn = false;
  private authSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2,
    private cartService: CartService,
    private userManagementService: UserManagementService,
    private el: ElementRef
  ) { }

  getUserName(): string {
    return this.authService.user?.userName || '';
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navbarOpen = false;
      }
    });

    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
    });

    this.authSubscription = this.userManagementService.selectedUser$.subscribe(user => {
      this.isLoggedIn = !!user && !!user.token;
    });

    this.cartService.loadDemoCart();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  closeMenu(): void {
    this.navbarOpen = false;
  }

  logout(): void {
    this.userManagementService.logout().subscribe({
      next: () => {
        this.userManagementService.setSelectedUser(null);
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
        this.closeMenu();
      },
      error: (err) => console.error('Logout failed', err)
    });
  }

  showDropdown(event: MouseEvent): void {
    const dropdownElement = (event.currentTarget as HTMLElement).querySelector('.dropdown-menu');
    if (dropdownElement) {
      this.renderer.addClass(dropdownElement, 'show');
    }
  }

  hideDropdown(event: MouseEvent): void {
    const dropdownElement = (event.currentTarget as HTMLElement).querySelector('.dropdown-menu');
    if (dropdownElement) {
      this.renderer.removeClass(dropdownElement, 'show');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target) && this.navbarOpen) {
      this.closeMenu();
    }
  }
}
