// Basic Response Types
export interface BaseResponse {
  response?: any;
  returnValue: number;
  errorMessage: string;
  errored: boolean;
}

export interface PagedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Request Models
export interface ReportRequest {
  title: string;
  content: string;
}

export interface LogsFilterRequest {
  startDate?: Date;
  endDate?: Date;
  level?: string;
  source?: string;
}

// Response Models
export interface ReportResponse {
  id: number;
  userId: number;
  userName?: string;
  title?: string;
  content?: string;
  createdAt: Date;
  isReviewed: boolean;
}

export interface LogResponse {
  id: number;
  message: string;
  level: string;
  timestamp: Date;
  source: string;
}

export interface ConfigurationData {
  key: string;
  value: string;
  category: string;
  description?: string;
}

// Enums
export enum LogLevel {
  Info = 0,
  Warning = 1,
  Error = 2,
  Critical = 3
} 