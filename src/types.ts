export interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
  image: string;
  folder: string;
  tags: string[];
  isFavorite: boolean;
  readLater: boolean;
  createdAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

type Language = 'ar' | 'en';