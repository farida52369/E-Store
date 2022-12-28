export interface RegisterRequest {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  isManager: boolean;
}

export interface ProfileInfoResponse {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
}

export interface LoginRequest {
  email: String;
  password: String;
}

export interface RefreshToken {
  refreshToken: string;
  email: string;
}

export interface AuthenticationResponse {
  authenticationToken: String;
  refreshToken: String;
  expiresAt: String;
  email: String;
}

export interface ProductRequest {
  title: string;
  price: number;
  category: string;
  inStock: number;
  description: string;
  owner: string;
}

// Specific Product All Details
export interface ProductResponse {
  productId: number;
  title: string;
  price: number;
  category: string;
  inStock: number;
  description: string;
  image: any;
  createdDate: string;
}

// Product Specific Details For Grabbing All Produts
export interface ProductSpecificDetails {
  productId: number;
  title: string;
  description: string;
  price: number;
  image: any;
}
