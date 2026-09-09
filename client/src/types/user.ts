export interface User {
  _id: string;
  username: string;
  email: string;
  profilePhoto: string;
  profilePhotoId: string;
  subscription: "Trial" | "Free" | "Basic" | "Premium";
  apiRequestCount: number;
}
