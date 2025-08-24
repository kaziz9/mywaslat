import { Link } from '../types';

export const mockLinks: Link[] = [
  {
    id: '1',
    url: 'https://example.com/react-best-practices',
    title: 'React Best Practices for 2024',
    description: 'A comprehensive guide to writing clean, maintainable React code with the latest best practices and patterns.',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    folder: 'Work',
    tags: ['React', 'JavaScript', 'Frontend', 'Best Practices'],
    isFavorite: true,
    readLater: false,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    url: 'https://example.com/machine-learning-intro',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning, including supervised and unsupervised learning techniques.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    folder: 'Study',
    tags: ['Machine Learning', 'AI', 'Data Science', 'Python'],
    isFavorite: false,
    readLater: true,
    createdAt: new Date('2024-01-14')
  },
  {
    id: '3',
    url: 'https://example.com/design-systems',
    title: 'Building Scalable Design Systems',
    description: 'How to create and maintain design systems that scale across large organizations and multiple products.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    folder: 'Work',
    tags: ['Design Systems', 'UI/UX', 'Frontend', 'Component Library'],
    isFavorite: true,
    readLater: true,
    createdAt: new Date('2024-01-13')
  },
  {
    id: '4',
    url: 'https://example.com/productivity-tips',
    title: '10 Productivity Tips for Remote Work',
    description: 'Proven strategies to stay productive and maintain work-life balance while working remotely.',
    image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
    folder: 'Personal',
    tags: ['Productivity', 'Remote Work', 'Tips', 'Work-Life Balance'],
    isFavorite: false,
    readLater: false,
    createdAt: new Date('2024-01-12')
  },
  {
    id: '5',
    url: 'https://example.com/typescript-advanced',
    title: 'Advanced TypeScript Patterns',
    description: 'Deep dive into advanced TypeScript features including conditional types, mapped types, and template literals.',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
    folder: 'Work',
    tags: ['TypeScript', 'JavaScript', 'Advanced', 'Programming'],
    isFavorite: false,
    readLater: true,
    createdAt: new Date('2024-01-11')
  },
  {
    id: '6',
    url: 'https://example.com/cooking-basics',
    title: 'Essential Cooking Techniques Every Beginner Should Know',
    description: 'Master these fundamental cooking techniques to become a more confident and versatile home cook.',
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800',
    folder: 'Fun',
    tags: ['Cooking', 'Food', 'Techniques', 'Beginners'],
    isFavorite: true,
    readLater: false,
    createdAt: new Date('2024-01-10')
  }
];