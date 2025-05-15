// Request Models
export interface TrackingRequest {
  trackingNumber: string;
}

// Response Models
export interface CargoServiceResponse {
  title: string;
  description: string;
  icon: string;
  price: string;
  estimatedDays: string;
}

export interface TrackingResultResponse {
  trackingNumber: string;
  status: string;
  estimatedDelivery?: Date;
  currentLocation?: string;
  carrier: string;
  events?: TrackingEventResponse[];
}

export interface TrackingEventResponse {
  timestamp: Date;
  location: string;
  description: string;
}

export enum CargoStatus {
  Processing = 0,
  InTransit = 1,
  OutForDelivery = 2,
  Delivered = 3,
  Exception = 4,
  Returned = 5
}

export interface CargoService {
  title: string;
  description: string;
  icon: string;
  price: string;
}

export interface TrackingForm {
  trackingNumber: string;
} 