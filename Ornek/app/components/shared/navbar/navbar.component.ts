import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  /** Menünün açık/kapalı durumu */
  isMenuOpen = false;
  
  /** Aktif dropdown menünün indeksi, null ise hiçbiri açık değil */
  activeDropdown: number | null = null;
  
  /** Tarayıcı penceresi genişliği (responsive davranış için) */
  windowWidth: number = window.innerWidth;

  constructor(private router: Router) {} 

  ngOnInit() {
    // Sayfa değiştiğinde menüyü ve açık dropdownları kapat
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
  }
  
  /**
   * Pencere boyutu değiştiğinde tetiklenir
   * Mobil menü açıkken pencere büyütülürse menüyü otomatik kapatır
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    
    // Masaüstü boyutuna geçilirse ve menü açıksa, menüyü kapat
    if (this.windowWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  /**
   * Ana menüyü açar/kapatır
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Menü kapandığında dropdown'ları da kapat
    if (!this.isMenuOpen) {
      this.activeDropdown = null;
    }
    
    // Menü açıksa body'nin scrollunu devre dışı bırak
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }
  
  /**
   * Menüyü kapatır
   */
  closeMenu() {
    this.isMenuOpen = false;
    this.activeDropdown = null;
    document.body.style.overflow = '';
  }

  /**
   * Dropdown menüyü açıp kapatır
   * @param index Dropdown menünün indeksi
   * @param event Event objesi, click event'inin yayılmasını engellemek için
   */
  toggleDropdown(index: number, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Eğer aynı dropdown'a tıklandıysa kapat, değilse yeni dropdown'ı aç
    this.activeDropdown = this.activeDropdown === index ? null : index;
  }

  /**
   * Belirli bir dropdown'ın aktif olup olmadığını kontrol eder
   * @param index Kontrol edilecek dropdown indeksi
   * @returns Dropdown aktifse true, değilse false
   */
  isDropdownOpen(index: number): boolean {
    return this.activeDropdown === index;
  }
}
