export interface RegisterRequest {
  firstName: String;
  lastName: String;
  password: String;
  email: String;
  gender: String;
  phoneNumber: String;
  dateOfBirth: String;
}

export interface LoginRequest {
  email: String;
  password: String;
}

export interface RefreshToken {}

export interface AuthenticationResponse {
  authenticationToken: String;
  refreshToken: String;
  expiresAt: String;
  email: String;
}
