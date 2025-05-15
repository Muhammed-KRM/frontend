import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactInfoResponse as ContactInfo, ContactFormRequest as ContactForm } from '../../../core/modals/Contact.Modal';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactInfo: ContactInfo = {
    address: 'Merkez Mahallesi, Atatürk Caddesi No:123',
    city: 'İstanbul',
    phone: '+90 (212) 123 45 67',
    email: 'info@eticaret.com',
    workingHours: 'Pazartesi - Cumartesi: 09:00 - 18:00'
  };

  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    // Form gönderme işlemi burada yapılacak
    console.log('Form gönderildi:', this.contactForm);
  }
} 