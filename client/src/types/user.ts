export interface User {
  _id: string;
  username: string;
  email: string;
  profilePhoto: string;
  subscription: "Trial" | "Free" | "Basic" | "Premium";
  apiRequestCount: number;
}
