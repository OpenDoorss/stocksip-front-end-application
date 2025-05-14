export interface Profile {
  id: number;
  name: string;
  email: string;
  businessName: string;
  phone: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
