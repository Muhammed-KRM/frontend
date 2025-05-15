// Address Models
export interface AddressInfo {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  zipCode: string;
  phone: string;
}

// Form Models
export interface CheckoutForm {
  shippingAddress: AddressInfo;
  billingAddress: AddressInfo;
  sameAsBilling: boolean;
  paymentMethod: string;
  cardInfo?: CardInfo;
  notes?: string;
}

export interface CardInfo {
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

// Shipping Method
export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
  icon: string;
}

// Payment Method
export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export enum PaymentMethodType {
  CreditCard = 'credit_card',
  BankTransfer = 'bank_transfer',
  CashOnDelivery = 'cash_on_delivery'
} 