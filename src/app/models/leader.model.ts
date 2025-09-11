// src/app/models/leader.model.ts
export interface Leader {
  id: number;
  fullname: string;
  email: string;
  contact: number;
  title: string;
  description: string;
  image_url: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  role?: string;
  achievements?: string[];
}
