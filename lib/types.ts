export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type Condition = "NEW" | "GOOD" | "FAIR";
export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "CANCELLED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  meta?: PaginationMeta;
  data: T;
  errorDetails?: { path: string | number; message: string }[] | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: Role;
  status: UserStatus;
  profilePicture?: string | null;
  address?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GearItem {
  id: string;
  providerId: string;
  categoryId: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: string | number;
  condition: Condition;
  specifications?: Record<string, unknown> | null;
  stock: number;
  availability: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category?: { id: string; name: string };
  provider?: { id: string; fullName: string; email?: string };
  reviews?: Review[];
}

export interface RentalOrder {
  id: string;
  customerId: string;
  gearId: string;
  providerId: string;
  rentalStartDate: string;
  rentalEndDate: string;
  quantity: number;
  totalAmount: string | number;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
  gear?: { id: string; name: string; brand: string; pricePerDay?: string | number };
  customer?: { id: string; fullName: string; email: string };
  provider?: { id: string; fullName: string; email: string };
  payment?: Payment | null;
  review?: Review | null;
}

export interface Payment {
  id: string;
  rentalOrderId: string;
  customerId: string;
  amount: string | number;
  currency: string;
  provider: "STRIPE" | "SSLCOMMERZ";
  transactionId?: string | null;
  status: PaymentStatus;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
  rentalOrder?: { id: string; status: RentalStatus; gear: { id: string; name: string } };
}

export interface Review {
  id: string;
  gearId: string;
  customerId: string;
  rentalOrderId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  updatedAt: string;
  customer?: { id: string; fullName: string };
}
