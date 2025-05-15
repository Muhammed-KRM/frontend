import { Routes } from '@angular/router';
import { HomeComponent } from './components/modules/Home/home.component';
import { AboutComponent } from './components/modules/about/about.component';
import { ToolsComponent } from './components/shared/tools/tools.component';
import { LoginComponent } from './components/modules/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { SinginComponent } from './components/modules/singin/singin.component';
import { ProductsComponent } from './components/modules/products/products.component';
import { ContactComponent } from './components/modules/contact/contact.component';
import { CargoComponent } from './components/modules/cargo/cargo.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Ana Sayfa'
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [authGuard],
    title: 'Hakkımızda'
  },
  {
    path: 'tools',
    component: ToolsComponent,
    title: 'Araçlar'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Giriş Yap'
  },
  {
    path: 'signin',
    component: SinginComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Ürünler'
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./components/modules/product-detail/product-detail.component').then(c => c.ProductDetailComponent)
  },
  {
    path: 'products/category/:category',
    loadComponent: () => import('./components/modules/products/products.component').then(c => c.ProductsComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/modules/cart/cart.component').then(c => c.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/modules/checkout/checkout.component').then(c => c.CheckoutComponent)
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'İletişim'
  },
  {
    path: 'cargo',
    component: CargoComponent,
    title: 'Kargo ve Teslimat'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
