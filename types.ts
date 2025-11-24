export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
}

export interface ValueCardProps {
  number: string;
  title: string;
  description: string;
  theme: 'teal' | 'black' | 'gray';
}