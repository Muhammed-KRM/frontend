import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CargoService, TrackingForm } from '../../../core/modals/Cargo.Modal';

@Component({
  selector: 'app-cargo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoComponent {
  cargoServices: CargoService[] = [
    {
      title: 'Standart Teslimat',
      description: '3-5 iş günü içinde teslimat',
      icon: 'fas fa-truck',
      price: 'Ücretsiz'
    },
    {
      title: 'Hızlı Teslimat',
      description: '1-2 iş günü içinde teslimat',
      icon: 'fas fa-shipping-fast',
      price: '29.99 TL'
    },
    {
      title: 'Aynı Gün Teslimat',
      description: 'Aynı gün içinde teslimat',
      icon: 'fas fa-bolt',
      price: '49.99 TL'
    }
  ];

  trackingForm: TrackingForm = {
    trackingNumber: ''
  };

  onTrack() {
    // Kargo takip işlemi burada yapılacak
    console.log('Kargo takip numarası:', this.trackingForm.trackingNumber);
  }
} 