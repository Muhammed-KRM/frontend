// Request Models
export interface ContactFormRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Response Models
export interface ContactInfoResponse {
  address: string;
  city: string;
  phone: string;
  email: string;
  workingHours: string;
}

export interface ContactFormSubmitResponse {
  success: boolean;
  message: string;
  referenceCode?: string;
} 