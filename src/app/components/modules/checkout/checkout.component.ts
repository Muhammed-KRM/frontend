import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { CartResponse } from '../../../core/modals/Cart.Modal';
import { 
  CheckoutForm, 
  AddressInfo, 
  CardInfo, 
  ShippingMethod, 
  PaymentMethod, 
  PaymentMethodType 
} from '../../../core/modals/Checkout.Modal';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart: CartResponse | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  // Toplam tutarlar
  subtotal: number = 0;
  shipping: number = 0;
  total: number = 0;
  
  // Form grupları
  checkoutForm!: FormGroup;
  
  // Adım kontrolü
  currentStep: number = 1;
  
  // Kargo seçenekleri
  shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Standart Kargo',
      description: '3-5 iş günü içinde teslimat',
      price: 0,
      estimatedDelivery: '3-5 İş Günü',
      icon: 'fas fa-truck'
    },
    {
      id: 'express',
      name: 'Hızlı Kargo',
      description: '1-2 iş günü içinde teslimat',
      price: 29.99,
      estimatedDelivery: '1-2 İş Günü',
      icon: 'fas fa-shipping-fast'
    },
    {
      id: 'same_day',
      name: 'Aynı Gün Teslimat',
      description: 'Bugün içinde teslimat (saat 14:00\'a kadar)',
      price: 49.99,
      estimatedDelivery: 'Bugün',
      icon: 'fas fa-rocket'
    }
  ];
  
  // Ödeme yöntemleri
  paymentMethods: PaymentMethod[] = [
    {
      id: PaymentMethodType.CreditCard,
      name: 'Kredi Kartı',
      description: 'Güvenli ödeme işlemi',
      icon: 'fas fa-credit-card'
    },
    {
      id: PaymentMethodType.BankTransfer,
      name: 'Havale / EFT',
      description: 'Banka havalesi ile ödeme',
      icon: 'fas fa-university'
    },
    {
      id: PaymentMethodType.CashOnDelivery,
      name: 'Kapıda Ödeme',
      description: 'Teslimat sırasında nakit veya kart ile ödeme',
      icon: 'fas fa-money-bill-wave'
    }
  ];
  
  // Iller listesi - gerçek projede API'den gelecek
  cities: string[] = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana',
    'Konya', 'Gaziantep', 'Şanlıurfa', 'Kocaeli', 'Mersin', 'Diyarbakır'
  ];
  
  // İlçeler listesi - gerçek projede seçilen ile göre API'den gelecek
  districts: { [key: string]: string[] } = {
    'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Beyoğlu', 'Ataşehir'],
    'Ankara': ['Çankaya', 'Keçiören', 'Mamak', 'Yenimahalle', 'Etimesgut', 'Sincan'],
    'İzmir': ['Konak', 'Karşıyaka', 'Bornova', 'Karabağlar', 'Buca', 'Bayraklı']
  };
  
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.initForm();
    this.loadCart();
  }
  
  // Form başlatma
  initForm(): void {
    this.checkoutForm = this.formBuilder.group({
      shippingAddress: this.createAddressFormGroup(),
      billingAddress: this.createAddressFormGroup(),
      sameAsBilling: [true],
      shippingMethod: ['standard', Validators.required],
      paymentMethod: [PaymentMethodType.CreditCard, Validators.required],
      cardInfo: this.formBuilder.group({
        cardholderName: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expiryMonth: ['', Validators.required],
        expiryYear: ['', Validators.required],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
      }),
      notes: ['']
    });
    
    // Fatura adresi = Teslimat adresi kontrolü
    this.checkoutForm.get('sameAsBilling')?.valueChanges.subscribe(same => {
      const billingAddressGroup = this.checkoutForm.get('billingAddress');
      if (same) {
        billingAddressGroup?.disable();
      } else {
        billingAddressGroup?.enable();
      }
    });
    
    // Ödeme yöntemi değiştiğinde kart bilgisi validasyonunu değiştir
    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      const cardInfoGroup = this.checkoutForm.get('cardInfo');
      if (method === PaymentMethodType.CreditCard) {
        cardInfoGroup?.enable();
        this.setCardValidators(true);
      } else {
        cardInfoGroup?.disable();
        this.setCardValidators(false);
      }
    });
  }
  
  // Adres form grubu oluşturma
  createAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]]
    });
  }
  
  // Kart doğrulayıcılarını ayarlama
  setCardValidators(required: boolean): void {
    const cardGroup = this.checkoutForm.get('cardInfo');
    if (!cardGroup) return;
    
    const validators = required ? [Validators.required] : [];
    const cardNumberValidators = required ? 
      [Validators.required, Validators.pattern(/^\d{16}$/)] : [];
    const cvvValidators = required ? 
      [Validators.required, Validators.pattern(/^\d{3,4}$/)] : [];
      
    cardGroup.get('cardholderName')?.setValidators(validators);
    cardGroup.get('cardNumber')?.setValidators(cardNumberValidators);
    cardGroup.get('expiryMonth')?.setValidators(validators);
    cardGroup.get('expiryYear')?.setValidators(validators);
    cardGroup.get('cvv')?.setValidators(cvvValidators);
    
    Object.keys((cardGroup as FormGroup).controls).forEach(controlName => {
      cardGroup.get(controlName)?.updateValueAndValidity();
    });
  }
  
  // Sepet bilgilerini yükleme
  loadCart(): void {
    this.loading = true;
    this.cartService.cart$.subscribe({
      next: (cart) => {
        this.cart = cart;
        this.calculateTotals();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Sepet bilgileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        this.loading = false;
        console.error('Sepet yükleme hatası:', error);
      }
    });
  }
  
  // Toplam tutarları hesaplama
  calculateTotals(): void {
    if (this.cart && this.cart.items.length > 0) {
      // Alt toplam hesaplama
      this.subtotal = this.cart.items.reduce((total, item) => total + item.totalPrice, 0);
      
      // Kargo ücreti hesaplama (500 TL üzeri alışverişlerde ücretsiz)
      const selectedShippingMethod = this.getSelectedShippingMethod();
      this.shipping = this.subtotal >= 500 ? 0 : selectedShippingMethod?.price || 0;
      
      // Toplam tutar hesaplama
      this.total = this.subtotal + this.shipping;
    } else {
      this.subtotal = 0;
      this.shipping = 0;
      this.total = 0;
    }
  }
  
  // Seçili kargo yöntemini al
  getSelectedShippingMethod(): ShippingMethod | undefined {
    const selectedMethodId = this.checkoutForm?.get('shippingMethod')?.value;
    return this.shippingMethods.find(method => method.id === selectedMethodId);
  }
  
  // Kargo yöntemi değiştiğinde
  onShippingMethodChange(): void {
    this.calculateTotals();
  }
  
  // Form gönderildiğinde
  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.markFormGroupTouched(this.checkoutForm);
      return;
    }
    
    const formValue = this.checkoutForm.value;
    const checkoutData: CheckoutForm = {
      shippingAddress: formValue.shippingAddress,
      billingAddress: formValue.sameAsBilling ? formValue.shippingAddress : formValue.billingAddress,
      sameAsBilling: formValue.sameAsBilling,
      paymentMethod: formValue.paymentMethod,
      cardInfo: formValue.paymentMethod === PaymentMethodType.CreditCard ? formValue.cardInfo : undefined,
      notes: formValue.notes
    };
    
    console.log('Sipariş verileri:', checkoutData);
    
    // Burada sipariş oluşturma API çağrısı yapılacak
    // Ardından, ödeme sayfasına yönlendirilecek
    
    // Örnek: Başarılı sipariş sayfasına yönlendir
    // this.router.navigate(['/order-confirmation', orderId]);
  }
  
  // İlçeleri şehire göre filtrele
  getDistrictsForCity(city: string): string[] {
    return this.districts[city] || [];
  }
  
  // Şehir değiştiğinde ilçeleri güncelle
  onCityChange(addressType: 'shippingAddress' | 'billingAddress'): void {
    const cityControl = this.checkoutForm.get(`${addressType}.city`);
    const districtControl = this.checkoutForm.get(`${addressType}.district`);
    
    if (cityControl && districtControl) {
      districtControl.setValue('');
    }
  }
  
  // Sonraki adıma geç
  nextStep(): void {
    if (this.currentStep === 1) {
      const shippingAddressGroup = this.checkoutForm.get('shippingAddress');
      if (shippingAddressGroup?.invalid) {
        this.markFormGroupTouched(shippingAddressGroup as FormGroup);
        return;
      }
    }
    
    this.currentStep++;
  }
  
  // Önceki adıma dön
  prevStep(): void {
    this.currentStep--;
  }
  
  // Form grubundaki tüm kontrollere dokunulmuş olarak işaretle
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
  // Form kontrolünün geçersiz olup olmadığını kontrol et
  isInvalid(controlName: string, addressType?: string): boolean {
    let control;
    
    if (addressType) {
      control = this.checkoutForm.get(`${addressType}.${controlName}`);
    } else {
      control = this.checkoutForm.get(controlName);
    }
    
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
} 