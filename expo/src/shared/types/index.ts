export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  calories?: number;
  ingredients?: string[];
  allergens?: string[];
  imageUrl?: string;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  inCoverage: boolean;
}

export interface Order {
  id: string;
  userId: string;
  status: 'PENDING' | 'PREPARING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';
  total: number;
  createdAt: string;
}
