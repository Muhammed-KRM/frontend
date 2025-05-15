import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', '../../../../styles.scss']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  officeLocations = [
    {
      city: 'İstanbul Merkez Ofis',
      address: 'Barbaros Bulvarı No:123, Beşiktaş, İstanbul',
      phone: '+90 212 123 4567',
      email: 'istanbul@marinagroup.com',
      hours: 'Pazartesi - Cuma: 09:00 - 18:00'
    },
    {
      city: 'Bodrum Ofis',
      address: 'Marina Caddesi No:45, Bodrum, Muğla',
      phone: '+90 252 123 4567',
      email: 'bodrum@marinagroup.com',
      hours: 'Pazartesi - Cumartesi: 09:00 - 19:00'
    },
    {
      city: 'Antalya Ofis',
      address: 'Liman Mahallesi, Akdeniz Caddesi No:78, Antalya',
      phone: '+90 242 123 4567',
      email: 'antalya@marinagroup.com',
      hours: 'Pazartesi - Cuma: 09:00 - 18:00'
    }
  ];

  submitForm() {
    console.log('Form gönderildi:', this.contactForm);
    // Form gönderme işlemi burada yapılacak
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
    this.resetForm();
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
